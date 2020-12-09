const gulp     = require('gulp');
const sri = require('gulp-sri');
const branch = require('git-branch');
const pkgVersion = require('./package.json').version;
const path = require('path');

// S3 CLIENT CONFIG
const s3 = require('gulp-s3-upload')({ useIAM:true });

// DEPLOYMENT CONFIGURATION OPTIONS
const source = ['dist/*.js', 'dist/*.map', 'dist/*.json']; // source for deploy
const sourceSRI =  ['dist/*.js', 'dist/*.map']; // source for sri generation
const Bucket = 'static.filestackapi.com' // upload bucked
const ACL = 'public-read'; // upload acl
const deployPath = 'filestack-react'; // upload path
const deploymentBranch = 'master'; // branch for upload production version
const cacheControll = { // cache controll for each version
  latest: 1,
  version: 30,
  beta: 0,
};

// HELPERS
const getDeployPath = (inputPath, version) => `${deployPath}/${version}/${path.basename(inputPath)}`;
const getMajorVersion = (version) => version.split('.')[0];

// GENERATE SRI TAG
gulp.task('sri', () => {
  return gulp.src(sourceSRI)
    .pipe(sri({
      fileName: 'dist/manifest.json',
      transform: (o) => {
        let newOb = {};
        for (const el in o) {
          newOb[el.replace('dist/', '')] = { sri: o[el] };
        };

        return newOb;
      }
    }))
    .pipe(gulp.dest('.'));
});

// DEPLOYMENTS
gulp.task('publish:beta', () => {
  return gulp.src(source)
    .pipe(s3({
      Bucket,
      ACL,
      CacheControl: `max-age=${cacheControll.beta * 86400}`,
      keyTransform: (path) =>  getDeployPath(path, 'beta'),
    }));
});

gulp.task('publish:latest', () => {
  return gulp.src(source)
    .pipe(s3({
      Bucket,
      ACL,
      CacheControl: `max-age=${cacheControll.latest * 86400}`,
      keyTransform: (path) =>  getDeployPath(path, `${getMajorVersion(pkgVersion)}.x.x`),
    }));
});

gulp.task('publish', gulp.series(() => {
  const currentBranch = branch.sync();
  console.info(`Current branch is "${currentBranch}"`)

  if (currentBranch !== deploymentBranch) {
    return gulp.start('publish:beta');
  }

  return gulp.src(source)
    .pipe(s3({
      Bucket,
      ACL,
      CacheControl: `max-age=${cacheControll.version * 86400}`,
      keyTransform: (path) =>  getDeployPath(path, pkgVersion),
    }));
}, () => {
  const currentBranch = branch.sync();
  if (currentBranch !== deploymentBranch) {
    return;
  }

  return gulp.start('publish:latest');
}));
