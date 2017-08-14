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
// import * as ts from 'typescript';
const stringUtils = require("../strings");
// function addBootstrapToNgModule(directory: string): Rule {
//   return (host: Tree) => {
//     const modulePath = `${directory}/src/app/app.module.ts`;
//     const sourceText = host.read(modulePath) !.toString('utf-8');
//     const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
//     const componentModule = './app.component';
//     const importChanges = addImportToModule(source,
//                                             modulePath,
//                                             'BrowserModule',
//                                             '@angular/platform-browser');
//     const bootstrapChanges = addBootstrapToModule(source,
//                                                   modulePath,
//                                                   'AppComponent',
//                                                   componentModule);
//     const changes = [
//       ...importChanges,
//       ...bootstrapChanges,
//     ];
//     const recorder = host.beginUpdate(modulePath);
//     for (const change of changes) {
//       if (change instanceof InsertChange) {
//         recorder.insertLeft(change.pos, change.toAdd);
//       }
//     }
//     host.commitUpdate(recorder);
//     return host;
//   };
// }
function minimalPathFilter(path) {
    const toRemoveList = [/e2e\//, /editorconfig/, /README/, /karma.conf.js/,
        /protractor.conf.js/, /test.ts/, /tsconfig.spec.json/,
        /tslint.json/, /favicon.ico/];
    return !toRemoveList.some(re => re.test(path));
}
function default_1(options) {
    return (host, context) => {
        // const appRootSelector = 'app-root';
        // const componentOptions = !options.minimal ?
        //   {
        //     inlineStyle: options.inlineStyle,
        //     inlineTemplate: options.inlineTemplate,
        //     spec: !options.skipTests,
        //     styleext: options.style,
        //   } :
        //   {
        //     inlineStyle: true,
        //     inlineTemplate: true,
        //     spec: false,
        //     styleext: options.style,
        //   };
        return schematics_1.chain([
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
                options.minimal ? schematics_1.filter(minimalPathFilter) : schematics_1.noop(),
                schematics_1.template(Object.assign({ utils: stringUtils, 'dot': '.' }, options)),
                schematics_1.move(options.directory),
            ])),
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2FwcGxpY2F0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsMkRBY29DO0FBQ3BDLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFNMUMsNkRBQTZEO0FBQzdELDZCQUE2QjtBQUM3QiwrREFBK0Q7QUFDL0Qsb0VBQW9FO0FBQ3BFLGdHQUFnRztBQUVoRyxpREFBaUQ7QUFFakQsc0RBQXNEO0FBQ3RELDBEQUEwRDtBQUMxRCwrREFBK0Q7QUFDL0QsNEVBQTRFO0FBQzVFLDREQUE0RDtBQUM1RCxnRUFBZ0U7QUFDaEUsb0VBQW9FO0FBQ3BFLHNFQUFzRTtBQUN0RSx3QkFBd0I7QUFDeEIsMEJBQTBCO0FBQzFCLDZCQUE2QjtBQUM3QixTQUFTO0FBRVQscURBQXFEO0FBQ3JELHNDQUFzQztBQUN0Qyw4Q0FBOEM7QUFDOUMseURBQXlEO0FBQ3pELFVBQVU7QUFDVixRQUFRO0FBQ1IsbUNBQW1DO0FBRW5DLG1CQUFtQjtBQUNuQixPQUFPO0FBQ1AsSUFBSTtBQUVKLDJCQUEyQixJQUFZO0lBQ3JDLE1BQU0sWUFBWSxHQUFhLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsZUFBZTtRQUNsRCxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsb0JBQW9CO1FBQ3JELGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUU5RCxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUNELG1CQUF5QixPQUEyQjtJQUNsRCxNQUFNLENBQUMsQ0FBQyxJQUFVLEVBQUUsT0FBeUI7UUFDM0Msc0NBQXNDO1FBQ3RDLDhDQUE4QztRQUM5QyxNQUFNO1FBQ04sd0NBQXdDO1FBQ3hDLDhDQUE4QztRQUM5QyxnQ0FBZ0M7UUFDaEMsK0JBQStCO1FBQy9CLFFBQVE7UUFDUixNQUFNO1FBQ04seUJBQXlCO1FBQ3pCLDRCQUE0QjtRQUM1QixtQkFBbUI7UUFDbkIsK0JBQStCO1FBQy9CLE9BQU87UUFFUCxNQUFNLENBQUMsa0JBQUssQ0FBQztZQUNYLHNCQUFTLENBQ1Asa0JBQUssQ0FBQyxnQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNwQixPQUFPLENBQUMsT0FBTyxHQUFHLG1CQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxpQkFBSSxFQUFFO2dCQUNwRCxxQkFBUSxpQkFDTixLQUFLLEVBQUUsV0FBVyxFQUNsQixLQUFLLEVBQUUsR0FBRyxJQUNQLE9BQWlCLEVBQ3BCO2dCQUNGLGlCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVcsQ0FBQzthQUMxQixDQUFDLENBQUM7U0E2Qk4sQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUE7QUFDSCxDQUFDO0FBMURELDRCQTBEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIC8vIE1lcmdlU3RyYXRlZ3ksXG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBjaGFpbixcbiAgZmlsdGVyLFxuICBtZXJnZVdpdGgsXG4gIG1vdmUsXG4gIG5vb3AsXG4gIC8vIHNjaGVtYXRpYyxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuLy8gaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgKiBhcyBzdHJpbmdVdGlscyBmcm9tICcuLi9zdHJpbmdzJztcbi8vIGltcG9ydCB7IGFkZEJvb3RzdHJhcFRvTW9kdWxlLCBhZGRJbXBvcnRUb01vZHVsZSB9IGZyb20gJy4uL3V0aWxpdHkvYXN0LXV0aWxzJztcbi8vIGltcG9ydCB7IEluc2VydENoYW5nZSB9IGZyb20gJy4uL3V0aWxpdHkvY2hhbmdlJztcbmltcG9ydCB7IFNjaGVtYSBhcyBBcHBsaWNhdGlvbk9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cblxuLy8gZnVuY3Rpb24gYWRkQm9vdHN0cmFwVG9OZ01vZHVsZShkaXJlY3Rvcnk6IHN0cmluZyk6IFJ1bGUge1xuLy8gICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbi8vICAgICBjb25zdCBtb2R1bGVQYXRoID0gYCR7ZGlyZWN0b3J5fS9zcmMvYXBwL2FwcC5tb2R1bGUudHNgO1xuLy8gICAgIGNvbnN0IHNvdXJjZVRleHQgPSBob3N0LnJlYWQobW9kdWxlUGF0aCkgIS50b1N0cmluZygndXRmLTgnKTtcbi8vICAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKG1vZHVsZVBhdGgsIHNvdXJjZVRleHQsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsIHRydWUpO1xuXG4vLyAgICAgY29uc3QgY29tcG9uZW50TW9kdWxlID0gJy4vYXBwLmNvbXBvbmVudCc7XG5cbi8vICAgICBjb25zdCBpbXBvcnRDaGFuZ2VzID0gYWRkSW1wb3J0VG9Nb2R1bGUoc291cmNlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVQYXRoLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQnJvd3Nlck1vZHVsZScsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJyk7XG4vLyAgICAgY29uc3QgYm9vdHN0cmFwQ2hhbmdlcyA9IGFkZEJvb3RzdHJhcFRvTW9kdWxlKHNvdXJjZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUGF0aCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FwcENvbXBvbmVudCcsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE1vZHVsZSk7XG4vLyAgICAgY29uc3QgY2hhbmdlcyA9IFtcbi8vICAgICAgIC4uLmltcG9ydENoYW5nZXMsXG4vLyAgICAgICAuLi5ib290c3RyYXBDaGFuZ2VzLFxuLy8gICAgIF07XG5cbi8vICAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4vLyAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuLy8gICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuLy8gICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuLy8gICAgIHJldHVybiBob3N0O1xuLy8gICB9O1xuLy8gfVxuXG5mdW5jdGlvbiBtaW5pbWFsUGF0aEZpbHRlcihwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgdG9SZW1vdmVMaXN0OiBSZWdFeHBbXSA9IFsvZTJlXFwvLywgL2VkaXRvcmNvbmZpZy8sIC9SRUFETUUvLCAva2FybWEuY29uZi5qcy8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL3Byb3RyYWN0b3IuY29uZi5qcy8sIC90ZXN0LnRzLywgL3RzY29uZmlnLnNwZWMuanNvbi8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL3RzbGludC5qc29uLywgL2Zhdmljb24uaWNvL107XG5cbiAgcmV0dXJuICF0b1JlbW92ZUxpc3Quc29tZShyZSA9PiByZS50ZXN0KHBhdGgpKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb25zOiBBcHBsaWNhdGlvbk9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgLy8gY29uc3QgYXBwUm9vdFNlbGVjdG9yID0gJ2FwcC1yb290JztcbiAgICAvLyBjb25zdCBjb21wb25lbnRPcHRpb25zID0gIW9wdGlvbnMubWluaW1hbCA/XG4gICAgLy8gICB7XG4gICAgLy8gICAgIGlubGluZVN0eWxlOiBvcHRpb25zLmlubGluZVN0eWxlLFxuICAgIC8vICAgICBpbmxpbmVUZW1wbGF0ZTogb3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSxcbiAgICAvLyAgICAgc3BlYzogIW9wdGlvbnMuc2tpcFRlc3RzLFxuICAgIC8vICAgICBzdHlsZWV4dDogb3B0aW9ucy5zdHlsZSxcbiAgICAvLyAgIH0gOlxuICAgIC8vICAge1xuICAgIC8vICAgICBpbmxpbmVTdHlsZTogdHJ1ZSxcbiAgICAvLyAgICAgaW5saW5lVGVtcGxhdGU6IHRydWUsXG4gICAgLy8gICAgIHNwZWM6IGZhbHNlLFxuICAgIC8vICAgICBzdHlsZWV4dDogb3B0aW9ucy5zdHlsZSxcbiAgICAvLyAgIH07XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgbWVyZ2VXaXRoKFxuICAgICAgICBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgICAgICAgIG9wdGlvbnMubWluaW1hbCA/IGZpbHRlcihtaW5pbWFsUGF0aEZpbHRlcikgOiBub29wKCksXG4gICAgICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAgICAgdXRpbHM6IHN0cmluZ1V0aWxzLFxuICAgICAgICAgICAgJ2RvdCc6ICcuJyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMgYXMgb2JqZWN0LFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkgISksXG4gICAgICAgIF0pKSxcbiAgICAgIC8vIHNjaGVtYXRpYygnbW9kdWxlJywge1xuICAgICAgLy8gICBuYW1lOiAnYXBwJyxcbiAgICAgIC8vICAgY29tbW9uTW9kdWxlOiBmYWxzZSxcbiAgICAgIC8vICAgZmxhdDogdHJ1ZSxcbiAgICAgIC8vICAgcm91dGluZzogb3B0aW9ucy5yb3V0aW5nLFxuICAgICAgLy8gICBzb3VyY2VEaXI6IG9wdGlvbnMuZGlyZWN0b3J5ICsgJy8nICsgb3B0aW9ucy5zb3VyY2VEaXIsXG4gICAgICAvLyAgIHNwZWM6IGZhbHNlLFxuICAgICAgLy8gfSksXG4gICAgICAvLyBzY2hlbWF0aWMoJ2NvbXBvbmVudCcsIHtcbiAgICAgIC8vICAgbmFtZTogJ2FwcCcsXG4gICAgICAvLyAgIHNlbGVjdG9yOiBhcHBSb290U2VsZWN0b3IsXG4gICAgICAvLyAgIHNvdXJjZURpcjogb3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBvcHRpb25zLnNvdXJjZURpcixcbiAgICAgIC8vICAgZmxhdDogdHJ1ZSxcbiAgICAgIC8vICAgLi4uY29tcG9uZW50T3B0aW9ucyxcbiAgICAgIC8vIH0pLFxuICAgICAgLy8gYWRkQm9vdHN0cmFwVG9OZ01vZHVsZShvcHRpb25zLmRpcmVjdG9yeSAhKSxcbiAgICAgIC8vIG1lcmdlV2l0aChcbiAgICAgIC8vICAgYXBwbHkodXJsKCcuL290aGVyLWZpbGVzJyksIFtcbiAgICAgIC8vICAgICBjb21wb25lbnRPcHRpb25zLmlubGluZVRlbXBsYXRlID8gZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5odG1sJykpIDogbm9vcCgpLFxuICAgICAgLy8gICAgICFjb21wb25lbnRPcHRpb25zLnNwZWMgPyBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMnKSkgOiBub29wKCksXG4gICAgICAvLyAgICAgdGVtcGxhdGUoe1xuICAgICAgLy8gICAgICAgdXRpbHM6IHN0cmluZ1V0aWxzLFxuICAgICAgLy8gICAgICAgLi4ub3B0aW9ucyBhcyBhbnksICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgICAgLy8gICAgICAgc2VsZWN0b3I6IGFwcFJvb3RTZWxlY3RvcixcbiAgICAgIC8vICAgICAgIC4uLmNvbXBvbmVudE9wdGlvbnMsXG4gICAgICAvLyAgICAgfSksXG4gICAgICAvLyAgICAgbW92ZShvcHRpb25zLmRpcmVjdG9yeSArICcvJyArIG9wdGlvbnMuc291cmNlRGlyICsgJy9hcHAnKSxcbiAgICAgIC8vICAgXSksIE1lcmdlU3RyYXRlZ3kuT3ZlcndyaXRlKSxcbiAgICBdKShob3N0LCBjb250ZXh0KTtcbiAgfVxufVxuIl19