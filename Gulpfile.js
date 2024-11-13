/* eslint-disable */
const gulp = require('gulp');
const hashsum = require('gulp-hashsum');
const through = require('through2');
const fs = require('fs');
const path = require('path');
const git = require('git-rev-sync');
const pkg = require('./package.json');
const { upload } = require('gulp-s3-publish');
const { S3 } = require('aws-sdk');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// DEPLOYMENT CONFIGURATION OPTIONS
const pkgName = pkg.name;
const pkgCurrentVersion = pkg.version;

const source = ['dist/*.js', 'dist/*.js.map', 'dist/*.css', 'dist/*.json']; // source for deploy
const sourceSRI = ['dist/*.js', 'dist/*.css']; // source for sri generation
const bucket = process.env.DEPLOY_BUCKET || 'static.filestackapi.com'; // upload bucked
const betaBranch = process.env.BETA_BRANCH || 'develop';
const dryRun = process.env.DRY_RUN || false;

const putObjectParams = {
  ACL: 'public-read'
};
const deployPath = pkgName; // upload path
// cache controll for each version
const cacheControl = {
  latest: 1,
  version: 30,
  beta: 0,
};

// HELPERS
let currentTag;
const currentBranch = git.branch();
const isCi = process.env.CI || false;
const forceDeploy = process.env.FORCE_DEPLOY || false;

try {
  currentTag = git.tag();
} catch(e) {
  console.log('Current Git Tag not found. Beta will be released');
}

// Get major version for "version deploy" ie: 1.x.x
const getMajorVersion = (version) => version.split('.')[0];

// get current pkg version from npm (we dont need to update)
const getCurrentReleasedVersion = async () => {
  const { stdout } = await exec(`npm view ${pkgName} version`);
  return stdout.trim();
};

if (forceDeploy) {
  console.info('!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.info('!!!!!!FORCE DEPLOYMENT!!!!!!');
  console.info('!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}

console.info('Current GIT Branch is', currentBranch);
console.info(`Current GIT Tag is`, currentTag);
console.info(`Is Continuous Integration Env`, isCi);

// S3
const S3Client = new S3();

const uploadFile = (version, CacheControl) => {
  const options = {
    bucket,
    putObjectParams: {
      ...putObjectParams,
      CacheControl: `max-age=${CacheControl * 86400}`,
    },
    uploadPath: `${deployPath}/${version}`,
    dryRun
  };

  console.info('Upload files with option:', options);

  return upload(S3Client, options);
}

/**
 * Check if we can deploy code to production CDN
 *
 * - pgk should be released only from CI
 * - pkg version should be different thant this on NPM repository
 * - git tag should be set
 * - current git tag should be equal to provided in package.json
 */
const canBeDeployedProd = async () => {
  if (!forceDeploy) {
    const currentVersion = await getCurrentReleasedVersion();

    if (!isCi) {
      console.info('Publish can be run only from CI. You can bypass it using FORCE flag');
      return Promise.resolve(false);
    }

    if (currentVersion === pkgCurrentVersion) {
      console.info(`Version ${pkgCurrentVersion} is already published (in npm). Skipping`);
      return Promise.resolve(false);
    }

    if (!currentTag) {
      console.info('Current tag is missing');
      return Promise.resolve(false);
    }

    if (currentTag !== pkgCurrentVersion) {
      console.info(`Package version ${pkgCurrentVersion} and GIT Tag (${currentTag}) are not equal. Skipping`);
      return Promise.resolve(false);
    }

  }

  return Promise.resolve(true);
}

// GENERATE SRI TAG
gulp.task('sri', () => {
  const manifest = {};
 
  return gulp.src(sourceSRI) // adjust to your `sourceSRI`
    .pipe(hashsum({ hash: 'sha384', json: false }))
    .pipe(through.obj((file, _, cb) => {
      const fileName = path.relative('dist', file.relative);
      manifest[fileName] = { sri: file.contents.toString() };
      cb(null, file);
    }))
    .on('end', () => {
      fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));
    });
});

// DEPLOYMENTS
gulp.task('publish:beta', (done) => {
  // beta can be deployed only from provided branch
  if (currentBranch !== betaBranch) {
    console.warn(`Skipping publish:beta task. Incorrect branch ${currentBranch}. Beta can be released from ${betaBranch}`);
    return done();
  }

  return gulp.src(source).pipe(uploadFile('beta', cacheControl.beta));
});

gulp.task('publish:latest', async () => {
  if (!(await canBeDeployedProd())) {
    console.warn('Skipping publish:latest task');
    return Promise.resolve();
  }

  return gulp.src(source).pipe(uploadFile(`${getMajorVersion(pkgCurrentVersion)}.x.x`, cacheControl.latest));
});

gulp.task('publish:version', async () => {
  if (!(await canBeDeployedProd())) {
    console.warn('Skipping publish:version task');
    return Promise.resolve();
  }

  return gulp.src(source).pipe(uploadFile(pkgCurrentVersion, cacheControl.version));
});

gulp.task('publish', gulp.series('sri', 'publish:beta', 'publish:version', 'publish:latest'));
