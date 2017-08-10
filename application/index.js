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
    console.log('options.style ', options.style);
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
    console.log('componentOptions.styleext ', componentOptions.styleext);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2FwcGxpY2F0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsOEVBQThFO0FBQzlFLHdCQUF3QjtBQUN4QiwyREFhb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLDBDQUEwQztBQUMxQyxvREFBK0U7QUFDL0UsOENBQWlEO0FBR2pELGdDQUFnQyxTQUFpQjtJQUMvQyxNQUFNLENBQUMsQ0FBQyxJQUFVO1FBQ2hCLE1BQU0sVUFBVSxHQUFHLEdBQUcsU0FBUyx3QkFBd0IsQ0FBQztRQUN4RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV6RixNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUUxQyxNQUFNLGFBQWEsR0FBRyw2QkFBaUIsQ0FBQyxNQUFNLEVBQ04sVUFBVSxFQUNWLGVBQWUsRUFDZiwyQkFBMkIsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sZ0JBQWdCLEdBQUcsZ0NBQW9CLENBQUMsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBQ2QsZUFBZSxDQUFDLENBQUM7UUFDL0QsTUFBTSxPQUFPLEdBQUc7WUFDZCxHQUFHLGFBQWE7WUFDaEIsR0FBRyxnQkFBZ0I7U0FDcEIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLENBQUMsTUFBTSxNQUFNLElBQUksT0FBTyxDQUFD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Q0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsbUJBQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsaUJBQUksRUFBRTtZQUM1RSxxQkFBUSxpQkFDTixLQUFLLEVBQUUsV0FBVyxJQUNmLE9BQU8sSUFDVixRQUFRLEVBQUUsZUFBZSxJQUN0QixnQkFBZ0IsRUFDbkI7WUFDRixpQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQzNELENBQUMsRUFBRSwwQkFBYSxDQUFDLFNBQVMsQ0FBQztLQUMvQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBekRELDRCQXlEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIFRPRE86IHJlcGxhY2UgYG9wdGlvbnM6IGFueWAgd2l0aCBhbiBhY3R1YWwgdHlwZSBnZW5lcmF0ZWQgZnJvbSB0aGUgc2NoZW1hLlxuLy8gdHNsaW50OmRpc2FibGU6bm8tYW55XG5pbXBvcnQge1xuICBNZXJnZVN0cmF0ZWd5LFxuICBSdWxlLFxuICBUcmVlLFxuICBhcHBseSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICBzY2hlbWF0aWMsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0ICogYXMgc3RyaW5nVXRpbHMgZnJvbSAnLi4vc3RyaW5ncyc7XG5pbXBvcnQgeyBhZGRCb290c3RyYXBUb01vZHVsZSwgYWRkSW1wb3J0VG9Nb2R1bGUgfSBmcm9tICcuLi91dGlsaXR5L2FzdC11dGlscyc7XG5pbXBvcnQgeyBJbnNlcnRDaGFuZ2UgfSBmcm9tICcuLi91dGlsaXR5L2NoYW5nZSc7XG5cblxuZnVuY3Rpb24gYWRkQm9vdHN0cmFwVG9OZ01vZHVsZShkaXJlY3Rvcnk6IHN0cmluZyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBjb25zdCBtb2R1bGVQYXRoID0gYCR7ZGlyZWN0b3J5fS9zcmMvYXBwL2FwcC5tb2R1bGUudHNgO1xuICAgIGNvbnN0IHNvdXJjZVRleHQgPSBob3N0LnJlYWQobW9kdWxlUGF0aCkgIS50b1N0cmluZygndXRmLTgnKTtcbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKG1vZHVsZVBhdGgsIHNvdXJjZVRleHQsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsIHRydWUpO1xuXG4gICAgY29uc3QgY29tcG9uZW50TW9kdWxlID0gJy4vYXBwLmNvbXBvbmVudCc7XG5cbiAgICBjb25zdCBpbXBvcnRDaGFuZ2VzID0gYWRkSW1wb3J0VG9Nb2R1bGUoc291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQnJvd3Nlck1vZHVsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJyk7XG4gICAgY29uc3QgYm9vdHN0cmFwQ2hhbmdlcyA9IGFkZEJvb3RzdHJhcFRvTW9kdWxlKHNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FwcENvbXBvbmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE1vZHVsZSk7XG4gICAgY29uc3QgY2hhbmdlcyA9IFtcbiAgICAgIC4uLmltcG9ydENoYW5nZXMsXG4gICAgICAuLi5ib290c3RyYXBDaGFuZ2VzLFxuICAgIF07XG5cbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5mdW5jdGlvbiBtaW5pbWFsUGF0aEZpbHRlcihwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgdG9SZW1vdmVMaXN0OiBSZWdFeHBbXSA9IFsvZTJlXFwvLywgL2VkaXRvcmNvbmZpZy8sIC9SRUFETUUvLCAva2FybWEuY29uZi5qcy8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL3Byb3RyYWN0b3IuY29uZi5qcy8sIC90ZXN0LnRzLywgL3RzY29uZmlnLnNwZWMuanNvbi8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL3RzbGludC5qc29uLywgL2Zhdmljb24uaWNvL107XG5cbiAgcmV0dXJuICF0b1JlbW92ZUxpc3Quc29tZShyZSA9PiByZS50ZXN0KHBhdGgpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnM6IGFueSk6IFJ1bGUge1xuICBjb25zdCBhcHBSb290U2VsZWN0b3IgPSAnYXBwLXJvb3QnO1xuICBjb25zb2xlLmxvZygnb3B0aW9ucy5zdHlsZSAnLCBvcHRpb25zLnN0eWxlKTtcbiAgY29uc3QgY29tcG9uZW50T3B0aW9ucyA9ICFvcHRpb25zLm1pbmltYWwgP1xuICB7XG4gICAgaW5saW5lU3R5bGU6IG9wdGlvbnMuaW5saW5lU3R5bGUsXG4gICAgaW5saW5lVGVtcGxhdGU6IG9wdGlvbnMuaW5saW5lVGVtcGxhdGUsXG4gICAgc3BlYzogIW9wdGlvbnMuc2tpcFRlc3RzLFxuICAgIHN0eWxlZXh0OiBvcHRpb25zLnN0eWxlLFxuICB9IDpcbiAge1xuICAgIGlubGluZVN0eWxlOiB0cnVlLFxuICAgIGlubGluZVRlbXBsYXRlOiB0cnVlLFxuICAgIHNwZWM6IGZhbHNlLFxuICAgIHN0eWxlZXh0OiBvcHRpb25zLnN0eWxlLFxuICB9O1xuICBjb25zb2xlLmxvZygnY29tcG9uZW50T3B0aW9ucy5zdHlsZWV4dCAnLCBjb21wb25lbnRPcHRpb25zLnN0eWxlZXh0KTtcblxuICByZXR1cm4gY2hhaW4oW1xuICAgIG1lcmdlV2l0aChcbiAgICAgIGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICAgIG9wdGlvbnMubWluaW1hbCA/IGZpbHRlcihtaW5pbWFsUGF0aEZpbHRlcikgOiBub29wKCksXG4gICAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgICB1dGlsczogc3RyaW5nVXRpbHMsXG4gICAgICAgICAgJ2RvdCc6ICcuJyxcbiAgICAgICAgICAuLi5vcHRpb25zIH0pLFxuICAgICAgICBtb3ZlKG9wdGlvbnMuZGlyZWN0b3J5KSxcbiAgICAgIF0pKSxcbiAgICBzY2hlbWF0aWMoJ21vZHVsZScsIHtcbiAgICAgIG5hbWU6ICdhcHAnLFxuICAgICAgY29tbW9uTW9kdWxlOiBmYWxzZSxcbiAgICAgIGZsYXQ6IHRydWUsXG4gICAgICByb3V0aW5nOiBvcHRpb25zLnJvdXRpbmcsXG4gICAgICBzb3VyY2VEaXI6IG9wdGlvbnMuZGlyZWN0b3J5ICsgJy8nICsgb3B0aW9ucy5zb3VyY2VEaXIsXG4gICAgICBzcGVjOiBmYWxzZSxcbiAgICB9KSxcbiAgICBzY2hlbWF0aWMoJ2NvbXBvbmVudCcsIHtcbiAgICAgIG5hbWU6ICdhcHAnLFxuICAgICAgc2VsZWN0b3I6IGFwcFJvb3RTZWxlY3RvcixcbiAgICAgIHNvdXJjZURpcjogb3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBvcHRpb25zLnNvdXJjZURpcixcbiAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAuLi5jb21wb25lbnRPcHRpb25zLFxuICAgIH0pLFxuICAgIGFkZEJvb3RzdHJhcFRvTmdNb2R1bGUob3B0aW9ucy5kaXJlY3RvcnkpLFxuICAgIG1lcmdlV2l0aChcbiAgICAgIGFwcGx5KHVybCgnLi9vdGhlci1maWxlcycpLCBbXG4gICAgICAgIGNvbXBvbmVudE9wdGlvbnMuaW5saW5lVGVtcGxhdGUgPyBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLmh0bWwnKSkgOiBub29wKCksXG4gICAgICAgICFjb21wb25lbnRPcHRpb25zLnNwZWMgPyBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMnKSkgOiBub29wKCksXG4gICAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgICB1dGlsczogc3RyaW5nVXRpbHMsXG4gICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICBzZWxlY3RvcjogYXBwUm9vdFNlbGVjdG9yLFxuICAgICAgICAgIC4uLmNvbXBvbmVudE9wdGlvbnMsXG4gICAgICAgIH0pLFxuICAgICAgICBtb3ZlKG9wdGlvbnMuZGlyZWN0b3J5ICsgJy8nICsgb3B0aW9ucy5zb3VyY2VEaXIgKyAnL2FwcCcpLFxuICAgICAgXSksIE1lcmdlU3RyYXRlZ3kuT3ZlcndyaXRlKSxcbiAgXSk7XG59XG4iXX0=