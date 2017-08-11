"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
    options.path = options.path ? schematics_1.normalizePath(options.path) : options.path;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2FwcGxpY2F0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsMkRBY29DO0FBQ3BDLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsb0RBQStFO0FBQy9FLDhDQUFpRDtBQUlqRCxnQ0FBZ0MsU0FBaUI7SUFDL0MsTUFBTSxDQUFDLENBQUMsSUFBVTtRQUNoQixNQUFNLFVBQVUsR0FBRyxHQUFHLFNBQVMsd0JBQXdCLENBQUM7UUFDeEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFekYsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUM7UUFFMUMsTUFBTSxhQUFhLEdBQUcsNkJBQWlCLENBQUMsTUFBTSxFQUNOLFVBQVUsRUFDVixlQUFlLEVBQ2YsMkJBQTJCLENBQUMsQ0FBQztRQUNyRSxNQUFNLGdCQUFnQixHQUFHLGdDQUFvQixDQUFDLE1BQU0sRUFDTixVQUFVLEVBQ1YsY0FBYyxFQUNkLGVBQWUsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sT0FBTyxHQUFHO1lBQ2QsR0FBRyxhQUFhO1lBQ2hCLEdBQUcsZ0JBQWdCO1NBQ3BCLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFD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QUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxpQkFBSSxFQUFFO1lBQzVFLHFCQUFRLGlCQUNOLEtBQUssRUFBRSxXQUFXLElBQ2YsT0FBYyxJQUNqQixRQUFRLEVBQUUsZUFBZSxJQUN0QixnQkFBZ0IsRUFDbkI7WUFDRixpQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQzNELENBQUMsRUFBRSwwQkFBYSxDQUFDLFNBQVMsQ0FBQztLQUMvQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBekRELDRCQXlEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIE1lcmdlU3RyYXRlZ3ksXG4gIFJ1bGUsXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBjaGFpbixcbiAgZmlsdGVyLFxuICBtZXJnZVdpdGgsXG4gIG1vdmUsXG4gIG5vb3AsXG4gIG5vcm1hbGl6ZVBhdGgsXG4gIHNjaGVtYXRpYyxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgKiBhcyBzdHJpbmdVdGlscyBmcm9tICcuLi9zdHJpbmdzJztcbmltcG9ydCB7IGFkZEJvb3RzdHJhcFRvTW9kdWxlLCBhZGRJbXBvcnRUb01vZHVsZSB9IGZyb20gJy4uL3V0aWxpdHkvYXN0LXV0aWxzJztcbmltcG9ydCB7IEluc2VydENoYW5nZSB9IGZyb20gJy4uL3V0aWxpdHkvY2hhbmdlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBBcHBsaWNhdGlvbk9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cblxuZnVuY3Rpb24gYWRkQm9vdHN0cmFwVG9OZ01vZHVsZShkaXJlY3Rvcnk6IHN0cmluZyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBjb25zdCBtb2R1bGVQYXRoID0gYCR7ZGlyZWN0b3J5fS9zcmMvYXBwL2FwcC5tb2R1bGUudHNgO1xuICAgIGNvbnN0IHNvdXJjZVRleHQgPSBob3N0LnJlYWQobW9kdWxlUGF0aCkgIS50b1N0cmluZygndXRmLTgnKTtcbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKG1vZHVsZVBhdGgsIHNvdXJjZVRleHQsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsIHRydWUpO1xuXG4gICAgY29uc3QgY29tcG9uZW50TW9kdWxlID0gJy4vYXBwLmNvbXBvbmVudCc7XG5cbiAgICBjb25zdCBpbXBvcnRDaGFuZ2VzID0gYWRkSW1wb3J0VG9Nb2R1bGUoc291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQnJvd3Nlck1vZHVsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJyk7XG4gICAgY29uc3QgYm9vdHN0cmFwQ2hhbmdlcyA9IGFkZEJvb3RzdHJhcFRvTW9kdWxlKHNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FwcENvbXBvbmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE1vZHVsZSk7XG4gICAgY29uc3QgY2hhbmdlcyA9IFtcbiAgICAgIC4uLmltcG9ydENoYW5nZXMsXG4gICAgICAuLi5ib290c3RyYXBDaGFuZ2VzLFxuICAgIF07XG5cbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5mdW5jdGlvbiBtaW5pbWFsUGF0aEZpbHRlcihwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgdG9SZW1vdmVMaXN0OiBSZWdFeHBbXSA9IFsvZTJlXFwvLywgL2VkaXRvcmNvbmZpZy8sIC9SRUFETUUvLCAva2FybWEuY29uZi5qcy8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL3Byb3RyYWN0b3IuY29uZi5qcy8sIC90ZXN0LnRzLywgL3RzY29uZmlnLnNwZWMuanNvbi8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL3RzbGludC5qc29uLywgL2Zhdmljb24uaWNvL107XG5cbiAgcmV0dXJuICF0b1JlbW92ZUxpc3Quc29tZShyZSA9PiByZS50ZXN0KHBhdGgpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnM6IEFwcGxpY2F0aW9uT3B0aW9ucyk6IFJ1bGUge1xuICBjb25zdCBhcHBSb290U2VsZWN0b3IgPSAnYXBwLXJvb3QnO1xuICBjb25zdCBjb21wb25lbnRPcHRpb25zID0gIW9wdGlvbnMubWluaW1hbCA/XG4gICAge1xuICAgICAgaW5saW5lU3R5bGU6IG9wdGlvbnMuaW5saW5lU3R5bGUsXG4gICAgICBpbmxpbmVUZW1wbGF0ZTogb3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSxcbiAgICAgIHNwZWM6ICFvcHRpb25zLnNraXBUZXN0cyxcbiAgICAgIHN0eWxlZXh0OiBvcHRpb25zLnN0eWxlLFxuICAgIH0gOlxuICAgIHtcbiAgICAgIGlubGluZVN0eWxlOiB0cnVlLFxuICAgICAgaW5saW5lVGVtcGxhdGU6IHRydWUsXG4gICAgICBzcGVjOiBmYWxzZSxcbiAgICAgIHN0eWxlZXh0OiBvcHRpb25zLnN0eWxlLFxuICAgIH07XG4gIG9wdGlvbnMucGF0aCA9IG9wdGlvbnMucGF0aCA/IG5vcm1hbGl6ZVBhdGgob3B0aW9ucy5wYXRoKSA6IG9wdGlvbnMucGF0aDtcblxuICByZXR1cm4gY2hhaW4oW1xuICAgIG1lcmdlV2l0aChcbiAgICAgIGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICAgIG9wdGlvbnMubWluaW1hbCA/IGZpbHRlcihtaW5pbWFsUGF0aEZpbHRlcikgOiBub29wKCksXG4gICAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgICB1dGlsczogc3RyaW5nVXRpbHMsXG4gICAgICAgICAgJ2RvdCc6ICcuJyxcbiAgICAgICAgICAuLi5vcHRpb25zIGFzIG9iamVjdCxcbiAgICAgICAgfSksXG4gICAgICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkgISksXG4gICAgICBdKSksXG4gICAgc2NoZW1hdGljKCdtb2R1bGUnLCB7XG4gICAgICBuYW1lOiAnYXBwJyxcbiAgICAgIGNvbW1vbk1vZHVsZTogZmFsc2UsXG4gICAgICBmbGF0OiB0cnVlLFxuICAgICAgcm91dGluZzogb3B0aW9ucy5yb3V0aW5nLFxuICAgICAgc291cmNlRGlyOiBvcHRpb25zLmRpcmVjdG9yeSArICcvJyArIG9wdGlvbnMuc291cmNlRGlyLFxuICAgICAgc3BlYzogZmFsc2UsXG4gICAgfSksXG4gICAgc2NoZW1hdGljKCdjb21wb25lbnQnLCB7XG4gICAgICBuYW1lOiAnYXBwJyxcbiAgICAgIHNlbGVjdG9yOiBhcHBSb290U2VsZWN0b3IsXG4gICAgICBzb3VyY2VEaXI6IG9wdGlvbnMuZGlyZWN0b3J5ICsgJy8nICsgb3B0aW9ucy5zb3VyY2VEaXIsXG4gICAgICBmbGF0OiB0cnVlLFxuICAgICAgLi4uY29tcG9uZW50T3B0aW9ucyxcbiAgICB9KSxcbiAgICBhZGRCb290c3RyYXBUb05nTW9kdWxlKG9wdGlvbnMuZGlyZWN0b3J5ICEpLFxuICAgIG1lcmdlV2l0aChcbiAgICAgIGFwcGx5KHVybCgnLi9vdGhlci1maWxlcycpLCBbXG4gICAgICAgIGNvbXBvbmVudE9wdGlvbnMuaW5saW5lVGVtcGxhdGUgPyBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLmh0bWwnKSkgOiBub29wKCksXG4gICAgICAgICFjb21wb25lbnRPcHRpb25zLnNwZWMgPyBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMnKSkgOiBub29wKCksXG4gICAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgICB1dGlsczogc3RyaW5nVXRpbHMsXG4gICAgICAgICAgLi4ub3B0aW9ucyBhcyBhbnksICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgICAgICAgIHNlbGVjdG9yOiBhcHBSb290U2VsZWN0b3IsXG4gICAgICAgICAgLi4uY29tcG9uZW50T3B0aW9ucyxcbiAgICAgICAgfSksXG4gICAgICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBvcHRpb25zLnNvdXJjZURpciArICcvYXBwJyksXG4gICAgICBdKSwgTWVyZ2VTdHJhdGVneS5PdmVyd3JpdGUpLFxuICBdKTtcbn1cbiJdfQ==