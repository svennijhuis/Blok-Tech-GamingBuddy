// Aanroepen gulp + aanroepen plugins
const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const nodemon = require("gulp-nodemon");

// Taak om alle CSS te zoeken in public
gulp.task("css", () => (
    gulp.src("./public/css/*.css")
    // CSS opschonen
    .pipe(cleanCSS({ compatibility: "ie8" }))
    // CSS in 1 bestand
    .pipe(concat("style.min.css"))
    // CSS bestand plaatsen in public/dist
    .pipe(gulp.dest("public/dist"))
    ));


// Taak om te kijken of er wijzigingen zijn en voert opnieuw uit als dit het geval is.
gulp.task("watch", () => (
    gulp.watch("./static/styles/*.css", gulp.series("css"))
));

// Taak om applicatie te starten met nodemon
gulp.task("start", (done) => (
    nodemon({
        // start de server.js
        script: "server.js",
        // checkt of er veranderingen zijn in .js .hbs of .css bestanden en runt dan opnieuw
        ext: "js hbs css",
        // wanneer wijzigingen in css runt die opnieuw de css task
        tasks: ["css"],
        done: done
    })
));


// gulp.task("default", gulp.series("css", "start"));

gulp.task('default', gulp.series('css'));

// gulp.task('build', gulp.series('css'));
