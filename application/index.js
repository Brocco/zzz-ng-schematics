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
            spec: !options.skipTests,
            styleext: options.style,
        } :
        {
            inlineStyle: true,
            inlineTemplate: true,
            spec: false,
            styleext: options.style,
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
            routing: options.routing,
            sourceDir: options.directory + '/' + options.sourceDir,
            spec: false,
        }),
        schematics_1.schematic('component', Object.assign({ name: 'app', selector: appRootSelector, sourceDir: options.directory + '/' + options.sourceDir, flat: true }, componentOptions)),
        addBootstrapToNgModule(options.directory),
        schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./other-files'), [
            componentOptions.inlineTemplate ? schematics_1.filter(path => !path.endsWith('.html')) : schematics_1.noop(),
            !componentOptions.spec ? schematics_1.filter(path => !path.endsWith('.spec.ts')) : schematics_1.noop(),
            schematics_1.template(Object.assign({ utils: stringUtils }, options, { selector: appRootSelector }, componentOptions)),
            schematics_1.move(options.directory + '/' + options.sourceDir + '/app'),
        ]), schematics_1.MergeStrategy.Overwrite),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2FwcGxpY2F0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsOEVBQThFO0FBQzlFLHdCQUF3QjtBQUN4QiwyREFhb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLDBDQUEwQztBQUMxQyxvREFBK0U7QUFDL0UsOENBQWlEO0FBR2pELGdDQUFnQyxTQUFpQjtJQUMvQyxNQUFNLENBQUMsQ0FBQyxJQUFVO1FBQ2hCLE1BQU0sVUFBVSxHQUFHLEdBQUcsU0FBUyx3QkFBd0IsQ0FBQztRQUN4RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV6RixNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUUxQyxNQUFNLGFBQWEsR0FBRyw2QkFBaUIsQ0FBQyxNQUFNLEVBQ04sVUFBVSxFQUNWLGVBQWUsRUFDZiwyQkFBMkIsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sZ0JBQWdCLEdBQUcsZ0NBQW9CLENBQUMsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBQ2QsZUFBZSxDQUFDLENBQUM7UUFDL0QsTUFBTSxPQUFPLEdBQUc7WUFDZCxHQUFHLGFBQWE7WUFDaEIsR0FBRyxnQkFBZ0I7U0FDcEIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLENBQUMsTUFBTSxNQUFNLElBQUksT0FBTyxDQUFD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QUFFLFdBQVcsSUFDZixPQUFPLElBQ1YsUUFBUSxFQUFFLGVBQWUsSUFDdEIsZ0JBQWdCLEVBQ25CO1lBQ0YsaUJBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztTQUMzRCxDQUFDLEVBQUUsMEJBQWEsQ0FBQyxTQUFTLENBQUM7S0FDL0IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXZERCw0QkF1REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyBUT0RPOiByZXBsYWNlIGBvcHRpb25zOiBhbnlgIHdpdGggYW4gYWN0dWFsIHR5cGUgZ2VuZXJhdGVkIGZyb20gdGhlIHNjaGVtYS5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWFueVxuaW1wb3J0IHtcbiAgTWVyZ2VTdHJhdGVneSxcbiAgUnVsZSxcbiAgVHJlZSxcbiAgYXBwbHksXG4gIGNoYWluLFxuICBmaWx0ZXIsXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgbm9vcCxcbiAgc2NoZW1hdGljLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCAqIGFzIHN0cmluZ1V0aWxzIGZyb20gJy4uL3N0cmluZ3MnO1xuaW1wb3J0IHsgYWRkQm9vdHN0cmFwVG9Nb2R1bGUsIGFkZEltcG9ydFRvTW9kdWxlIH0gZnJvbSAnLi4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuaW1wb3J0IHsgSW5zZXJ0Q2hhbmdlIH0gZnJvbSAnLi4vdXRpbGl0eS9jaGFuZ2UnO1xuXG5cbmZ1bmN0aW9uIGFkZEJvb3RzdHJhcFRvTmdNb2R1bGUoZGlyZWN0b3J5OiBzdHJpbmcpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IGAke2RpcmVjdG9yeX0vc3JjL2FwcC9hcHAubW9kdWxlLnRzYDtcbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpICEudG9TdHJpbmcoJ3V0Zi04Jyk7XG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShtb2R1bGVQYXRoLCBzb3VyY2VUZXh0LCB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LCB0cnVlKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudE1vZHVsZSA9ICcuL2FwcC5jb21wb25lbnQnO1xuXG4gICAgY29uc3QgaW1wb3J0Q2hhbmdlcyA9IGFkZEltcG9ydFRvTW9kdWxlKHNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Jyb3dzZXJNb2R1bGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlcicpO1xuICAgIGNvbnN0IGJvb3RzdHJhcENoYW5nZXMgPSBhZGRCb290c3RyYXBUb01vZHVsZShzb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBcHBDb21wb25lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRNb2R1bGUpO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBbXG4gICAgICAuLi5pbXBvcnRDaGFuZ2VzLFxuICAgICAgLi4uYm9vdHN0cmFwQ2hhbmdlcyxcbiAgICBdO1xuXG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWluaW1hbFBhdGhGaWx0ZXIocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHRvUmVtb3ZlTGlzdDogUmVnRXhwW10gPSBbL2UyZVxcLy8sIC9lZGl0b3Jjb25maWcvLCAvUkVBRE1FLywgL2thcm1hLmNvbmYuanMvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9wcm90cmFjdG9yLmNvbmYuanMvLCAvdGVzdC50cy8sIC90c2NvbmZpZy5zcGVjLmpzb24vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC90c2xpbnQuanNvbi8sIC9mYXZpY29uLmljby9dO1xuXG4gIHJldHVybiAhdG9SZW1vdmVMaXN0LnNvbWUocmUgPT4gcmUudGVzdChwYXRoKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb25zOiBhbnkpOiBSdWxlIHtcbiAgY29uc3QgYXBwUm9vdFNlbGVjdG9yID0gJ2FwcC1yb290JztcbiAgY29uc3QgY29tcG9uZW50T3B0aW9ucyA9ICFvcHRpb25zLm1pbmltYWwgP1xuICAgIHtcbiAgICAgIGlubGluZVN0eWxlOiBvcHRpb25zLmlubGluZVN0eWxlLFxuICAgICAgaW5saW5lVGVtcGxhdGU6IG9wdGlvbnMuaW5saW5lVGVtcGxhdGUsXG4gICAgICBzcGVjOiAhb3B0aW9ucy5za2lwVGVzdHMsXG4gICAgICBzdHlsZWV4dDogb3B0aW9ucy5zdHlsZSxcbiAgICB9IDpcbiAgICB7XG4gICAgICBpbmxpbmVTdHlsZTogdHJ1ZSxcbiAgICAgIGlubGluZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgc3BlYzogZmFsc2UsXG4gICAgICBzdHlsZWV4dDogb3B0aW9ucy5zdHlsZSxcbiAgICB9O1xuXG4gIHJldHVybiBjaGFpbihbXG4gICAgbWVyZ2VXaXRoKFxuICAgICAgYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgICAgb3B0aW9ucy5taW5pbWFsID8gZmlsdGVyKG1pbmltYWxQYXRoRmlsdGVyKSA6IG5vb3AoKSxcbiAgICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAgIHV0aWxzOiBzdHJpbmdVdGlscyxcbiAgICAgICAgICAnZG90JzogJy4nLFxuICAgICAgICAgIC4uLm9wdGlvbnMgfSksXG4gICAgICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkpLFxuICAgICAgXSkpLFxuICAgIHNjaGVtYXRpYygnbW9kdWxlJywge1xuICAgICAgbmFtZTogJ2FwcCcsXG4gICAgICBjb21tb25Nb2R1bGU6IGZhbHNlLFxuICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgIHJvdXRpbmc6IG9wdGlvbnMucm91dGluZyxcbiAgICAgIHNvdXJjZURpcjogb3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBvcHRpb25zLnNvdXJjZURpcixcbiAgICAgIHNwZWM6IGZhbHNlLFxuICAgIH0pLFxuICAgIHNjaGVtYXRpYygnY29tcG9uZW50Jywge1xuICAgICAgbmFtZTogJ2FwcCcsXG4gICAgICBzZWxlY3RvcjogYXBwUm9vdFNlbGVjdG9yLFxuICAgICAgc291cmNlRGlyOiBvcHRpb25zLmRpcmVjdG9yeSArICcvJyArIG9wdGlvbnMuc291cmNlRGlyLFxuICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgIC4uLmNvbXBvbmVudE9wdGlvbnMsXG4gICAgfSksXG4gICAgYWRkQm9vdHN0cmFwVG9OZ01vZHVsZShvcHRpb25zLmRpcmVjdG9yeSksXG4gICAgbWVyZ2VXaXRoKFxuICAgICAgYXBwbHkodXJsKCcuL290aGVyLWZpbGVzJyksIFtcbiAgICAgICAgY29tcG9uZW50T3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuaHRtbCcpKSA6IG5vb3AoKSxcbiAgICAgICAgIWNvbXBvbmVudE9wdGlvbnMuc3BlYyA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuc3BlYy50cycpKSA6IG5vb3AoKSxcbiAgICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAgIHV0aWxzOiBzdHJpbmdVdGlscyxcbiAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgIHNlbGVjdG9yOiBhcHBSb290U2VsZWN0b3IsXG4gICAgICAgICAgLi4uY29tcG9uZW50T3B0aW9ucyxcbiAgICAgICAgfSksXG4gICAgICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBvcHRpb25zLnNvdXJjZURpciArICcvYXBwJyksXG4gICAgICBdKSwgTWVyZ2VTdHJhdGVneS5PdmVyd3JpdGUpLFxuICBdKTtcbn1cbiJdfQ==