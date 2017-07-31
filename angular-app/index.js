"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO: replace `options: any` with an actual type generated from the schema.
// tslint:disable:no-any
const schematics_1 = require("@angular-devkit/schematics");
const ts = require("typescript");
const stringUtils = require("../strings");
const ast_utils_1 = require("../utility/ast-utils");
const change_1 = require("../utility/change");
function addBootstrapToNgModule(directory) {
    return (host) => {
        const modulePath = `${directory}/src/app/app.module.ts`;
        const sourceText = host.read(modulePath).toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const componentModule = './app.component';
        const importChanges = ast_utils_1.addImportToModule(source, modulePath, 'BrowserModule', '@angular/platform-browser');
        const bootstrapChanges = ast_utils_1.addBootstrapToModule(source, modulePath, 'AppComponent', componentModule);
        const changes = [
            ...importChanges,
            ...bootstrapChanges,
        ];
        const recorder = host.beginUpdate(modulePath);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function minimalPathFilter(path) {
    const toRemoveList = [/e2e\//, /editorconfig/, /README/, /karma.conf.js/,
        /protractor.conf.js/, /test.ts/, /tsconfig.spec.json/,
        /tslint.json/, /favicon.ico/];
    return !toRemoveList.some(re => re.test(path));
}
function default_1(options) {
    const appRootSelector = 'app-root';
    const componentOptions = !options.minimal ?
        {
            inlineStyle: options.inlineStyle,
            inlineTemplate: options.inlineTemplate,
            styleext: options.styleext,
            spec: !options.skipTests
        } :
        {
            inlineStyle: true,
            inlineTemplate: true,
            spec: false,
        };
    return schematics_1.chain([
        schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
            options.minimal ? schematics_1.filter(minimalPathFilter) : schematics_1.noop(),
            schematics_1.template(Object.assign({ utils: stringUtils, 'dot': '.' }, options)),
            schematics_1.move(options.directory),
        ])),
        schematics_1.schematic('module', {
            name: 'app',
            commonModule: false,
            flat: true,
            sourceDir: options.directory + '/' + options.sourceDir,
            routing: options.routing,
        }),
        schematics_1.schematic('component', Object.assign({ name: 'app', selector: appRootSelector, sourceDir: options.directory + '/' + options.sourceDir, flat: true }, componentOptions)),
        addBootstrapToNgModule(options.directory),
        schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./other-files'), [
            componentOptions.inlineTemplate ? schematics_1.filter(path => !path.endsWith('.html')) : schematics_1.noop(),
            componentOptions.spec ? schematics_1.filter(path => !path.endsWith('.spec.ts')) : schematics_1.noop(),
            schematics_1.template(Object.assign({ utils: stringUtils }, options, { selector: appRootSelector }, componentOptions)),
            schematics_1.move(options.directory + '/' + options.sourceDir + '/app'),
        ]), schematics_1.MergeStrategy.Overwrite),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2FuZ3VsYXItYXBwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsOEVBQThFO0FBQzlFLHdCQUF3QjtBQUN4QiwyREFhb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLDBDQUEwQztBQUMxQyxvREFBK0U7QUFDL0UsOENBQWlEO0FBR2pELGdDQUFnQyxTQUFpQjtJQUMvQyxNQUFNLENBQUMsQ0FBQyxJQUFVO1FBQ2hCLE1BQU0sVUFBVSxHQUFHLEdBQUcsU0FBUyx3QkFBd0IsQ0FBQztRQUN4RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV6RixNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUUxQyxNQUFNLGFBQWEsR0FBRyw2QkFBaUIsQ0FBQyxNQUFNLEVBQ04sVUFBVSxFQUNWLGVBQWUsRUFDZiwyQkFBMkIsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sZ0JBQWdCLEdBQUcsZ0NBQW9CLENBQUMsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBQ2QsZUFBZSxDQUFDLENBQUM7UUFDL0QsTUFBTSxPQUFPLEdBQUc7WUFDZCxHQUFHLGFBQWE7WUFDaEIsR0FBRyxnQkFBZ0I7U0FDcEIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLENBQUMsTUFBTSxNQUFNLElBQUksT0FBTyxDQUFD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QjtZQUNGLGlCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDM0QsQ0FBQyxFQUFFLDBCQUFhLENBQUMsU0FBUyxDQUFDO0tBQy9CLENBQUMsQ0FBQztBQUNMLENBQUM7QUFyREQsNEJBcURDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLy8gVE9ETzogcmVwbGFjZSBgb3B0aW9uczogYW55YCB3aXRoIGFuIGFjdHVhbCB0eXBlIGdlbmVyYXRlZCBmcm9tIHRoZSBzY2hlbWEuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1hbnlcbmltcG9ydCB7XG4gIE1lcmdlU3RyYXRlZ3ksXG4gIFJ1bGUsXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBjaGFpbixcbiAgZmlsdGVyLFxuICBtZXJnZVdpdGgsXG4gIG1vdmUsXG4gIG5vb3AsXG4gIHNjaGVtYXRpYyxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgKiBhcyBzdHJpbmdVdGlscyBmcm9tICcuLi9zdHJpbmdzJztcbmltcG9ydCB7IGFkZEJvb3RzdHJhcFRvTW9kdWxlLCBhZGRJbXBvcnRUb01vZHVsZSB9IGZyb20gJy4uL3V0aWxpdHkvYXN0LXV0aWxzJztcbmltcG9ydCB7IEluc2VydENoYW5nZSB9IGZyb20gJy4uL3V0aWxpdHkvY2hhbmdlJztcblxuXG5mdW5jdGlvbiBhZGRCb290c3RyYXBUb05nTW9kdWxlKGRpcmVjdG9yeTogc3RyaW5nKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGNvbnN0IG1vZHVsZVBhdGggPSBgJHtkaXJlY3Rvcnl9L3NyYy9hcHAvYXBwLm1vZHVsZS50c2A7XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKSAhLnRvU3RyaW5nKCd1dGYtOCcpO1xuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUobW9kdWxlUGF0aCwgc291cmNlVGV4dCwgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCwgdHJ1ZSk7XG5cbiAgICBjb25zdCBjb21wb25lbnRNb2R1bGUgPSAnLi9hcHAuY29tcG9uZW50JztcblxuICAgIGNvbnN0IGltcG9ydENoYW5nZXMgPSBhZGRJbXBvcnRUb01vZHVsZShzb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdCcm93c2VyTW9kdWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInKTtcbiAgICBjb25zdCBib290c3RyYXBDaGFuZ2VzID0gYWRkQm9vdHN0cmFwVG9Nb2R1bGUoc291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQXBwQ29tcG9uZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50TW9kdWxlKTtcbiAgICBjb25zdCBjaGFuZ2VzID0gW1xuICAgICAgLi4uaW1wb3J0Q2hhbmdlcyxcbiAgICAgIC4uLmJvb3RzdHJhcENoYW5nZXMsXG4gICAgXTtcblxuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShtb2R1bGVQYXRoKTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG1pbmltYWxQYXRoRmlsdGVyKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCB0b1JlbW92ZUxpc3Q6IFJlZ0V4cFtdID0gWy9lMmVcXC8vLCAvZWRpdG9yY29uZmlnLywgL1JFQURNRS8sIC9rYXJtYS5jb25mLmpzLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvcHJvdHJhY3Rvci5jb25mLmpzLywgL3Rlc3QudHMvLCAvdHNjb25maWcuc3BlYy5qc29uLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvdHNsaW50Lmpzb24vLCAvZmF2aWNvbi5pY28vXTtcblxuICByZXR1cm4gIXRvUmVtb3ZlTGlzdC5zb21lKHJlID0+IHJlLnRlc3QocGF0aCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9uczogYW55KTogUnVsZSB7XG4gIGNvbnN0IGFwcFJvb3RTZWxlY3RvciA9ICdhcHAtcm9vdCc7XG4gIGNvbnN0IGNvbXBvbmVudE9wdGlvbnMgPSAhb3B0aW9ucy5taW5pbWFsID9cbiAgICB7XG4gICAgICBpbmxpbmVTdHlsZTogb3B0aW9ucy5pbmxpbmVTdHlsZSxcbiAgICAgIGlubGluZVRlbXBsYXRlOiBvcHRpb25zLmlubGluZVRlbXBsYXRlLFxuICAgICAgc3R5bGVleHQ6IG9wdGlvbnMuc3R5bGVleHQsXG4gICAgICBzcGVjOiAhb3B0aW9ucy5za2lwVGVzdHNcbiAgICB9IDpcbiAgICB7XG4gICAgICBpbmxpbmVTdHlsZTogdHJ1ZSxcbiAgICAgIGlubGluZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgc3BlYzogZmFsc2UsXG4gICAgfTtcblxuICByZXR1cm4gY2hhaW4oW1xuICAgIG1lcmdlV2l0aChcbiAgICAgIGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICAgIG9wdGlvbnMubWluaW1hbCA/IGZpbHRlcihtaW5pbWFsUGF0aEZpbHRlcikgOiBub29wKCksXG4gICAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgICB1dGlsczogc3RyaW5nVXRpbHMsXG4gICAgICAgICAgJ2RvdCc6ICcuJyxcbiAgICAgICAgICAuLi5vcHRpb25zIH0pLFxuICAgICAgICBtb3ZlKG9wdGlvbnMuZGlyZWN0b3J5KSxcbiAgICAgIF0pKSxcbiAgICBzY2hlbWF0aWMoJ21vZHVsZScsIHtcbiAgICAgIG5hbWU6ICdhcHAnLFxuICAgICAgY29tbW9uTW9kdWxlOiBmYWxzZSxcbiAgICAgIGZsYXQ6IHRydWUsXG4gICAgICBzb3VyY2VEaXI6IG9wdGlvbnMuZGlyZWN0b3J5ICsgJy8nICsgb3B0aW9ucy5zb3VyY2VEaXIsXG4gICAgICByb3V0aW5nOiBvcHRpb25zLnJvdXRpbmcsXG4gICAgfSksXG4gICAgc2NoZW1hdGljKCdjb21wb25lbnQnLCB7XG4gICAgICBuYW1lOiAnYXBwJyxcbiAgICAgIHNlbGVjdG9yOiBhcHBSb290U2VsZWN0b3IsXG4gICAgICBzb3VyY2VEaXI6IG9wdGlvbnMuZGlyZWN0b3J5ICsgJy8nICsgb3B0aW9ucy5zb3VyY2VEaXIsXG4gICAgICBmbGF0OiB0cnVlLFxuICAgICAgLi4uY29tcG9uZW50T3B0aW9ucyxcbiAgICB9KSxcbiAgICBhZGRCb290c3RyYXBUb05nTW9kdWxlKG9wdGlvbnMuZGlyZWN0b3J5KSxcbiAgICBtZXJnZVdpdGgoXG4gICAgICBhcHBseSh1cmwoJy4vb3RoZXItZmlsZXMnKSwgW1xuICAgICAgICBjb21wb25lbnRPcHRpb25zLmlubGluZVRlbXBsYXRlID8gZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5odG1sJykpIDogbm9vcCgpLFxuICAgICAgICBjb21wb25lbnRPcHRpb25zLnNwZWMgPyBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMnKSkgOiBub29wKCksXG4gICAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgICB1dGlsczogc3RyaW5nVXRpbHMsXG4gICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICBzZWxlY3RvcjogYXBwUm9vdFNlbGVjdG9yLFxuICAgICAgICAgIC4uLmNvbXBvbmVudE9wdGlvbnMsXG4gICAgICAgIH0pLFxuICAgICAgICBtb3ZlKG9wdGlvbnMuZGlyZWN0b3J5ICsgJy8nICsgb3B0aW9ucy5zb3VyY2VEaXIgKyAnL2FwcCcpLFxuICAgICAgXSksIE1lcmdlU3RyYXRlZ3kuT3ZlcndyaXRlKSxcbiAgXSk7XG59XG4iXX0=