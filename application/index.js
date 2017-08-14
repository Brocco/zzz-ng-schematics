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
    // return (host: Tree, context: SchematicContext) => {
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
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2FwcGxpY2F0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsMkRBY29DO0FBQ3BDLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFNMUMsNkRBQTZEO0FBQzdELDZCQUE2QjtBQUM3QiwrREFBK0Q7QUFDL0Qsb0VBQW9FO0FBQ3BFLGdHQUFnRztBQUVoRyxpREFBaUQ7QUFFakQsc0RBQXNEO0FBQ3RELDBEQUEwRDtBQUMxRCwrREFBK0Q7QUFDL0QsNEVBQTRFO0FBQzVFLDREQUE0RDtBQUM1RCxnRUFBZ0U7QUFDaEUsb0VBQW9FO0FBQ3BFLHNFQUFzRTtBQUN0RSx3QkFBd0I7QUFDeEIsMEJBQTBCO0FBQzFCLDZCQUE2QjtBQUM3QixTQUFTO0FBRVQscURBQXFEO0FBQ3JELHNDQUFzQztBQUN0Qyw4Q0FBOEM7QUFDOUMseURBQXlEO0FBQ3pELFVBQVU7QUFDVixRQUFRO0FBQ1IsbUNBQW1DO0FBRW5DLG1CQUFtQjtBQUNuQixPQUFPO0FBQ1AsSUFBSTtBQUVKLDJCQUEyQixJQUFZO0lBQ3JDLE1BQU0sWUFBWSxHQUFhLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsZUFBZTtRQUNsRCxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsb0JBQW9CO1FBQ3JELGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUU5RCxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUNELG1CQUF5QixPQUEyQjtJQUNsRCxzREFBc0Q7SUFDcEQsc0NBQXNDO0lBQ3RDLDhDQUE4QztJQUM5QyxNQUFNO0lBQ04sd0NBQXdDO0lBQ3hDLDhDQUE4QztJQUM5QyxnQ0FBZ0M7SUFDaEMsK0JBQStCO0lBQy9CLFFBQVE7SUFDUixNQUFNO0lBQ04seUJBQXlCO0lBQ3pCLDRCQUE0QjtJQUM1QixtQkFBbUI7SUFDbkIsK0JBQStCO0lBQy9CLE9BQU87SUFFUCxNQUFNLENBQUMsa0JBQUssQ0FBQztRQUNYLHNCQUFTLENBQ1Asa0JBQUssQ0FBQyxnQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsbUJBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLGlCQUFJLEVBQUU7WUFDcEQscUJBQVEsaUJBQ04sS0FBSyxFQUFFLFdBQVcsRUFDbEIsS0FBSyxFQUFFLEdBQUcsSUFDUCxPQUFpQixFQUNwQjtZQUNGLGlCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVcsQ0FBQztTQUMxQixDQUFDLENBQUM7S0ErQlIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTNERCw0QkEyREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1xuICAvLyBNZXJnZVN0cmF0ZWd5LFxuICBSdWxlLFxuICAvLyBTY2hlbWF0aWNDb250ZXh0LFxuICAvLyBUcmVlLFxuICBhcHBseSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICAvLyBzY2hlbWF0aWMsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbi8vIGltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0ICogYXMgc3RyaW5nVXRpbHMgZnJvbSAnLi4vc3RyaW5ncyc7XG4vLyBpbXBvcnQgeyBhZGRCb290c3RyYXBUb01vZHVsZSwgYWRkSW1wb3J0VG9Nb2R1bGUgfSBmcm9tICcuLi91dGlsaXR5L2FzdC11dGlscyc7XG4vLyBpbXBvcnQgeyBJbnNlcnRDaGFuZ2UgfSBmcm9tICcuLi91dGlsaXR5L2NoYW5nZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgQXBwbGljYXRpb25PcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5cbi8vIGZ1bmN0aW9uIGFkZEJvb3RzdHJhcFRvTmdNb2R1bGUoZGlyZWN0b3J5OiBzdHJpbmcpOiBSdWxlIHtcbi8vICAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4vLyAgICAgY29uc3QgbW9kdWxlUGF0aCA9IGAke2RpcmVjdG9yeX0vc3JjL2FwcC9hcHAubW9kdWxlLnRzYDtcbi8vICAgICBjb25zdCBzb3VyY2VUZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpICEudG9TdHJpbmcoJ3V0Zi04Jyk7XG4vLyAgICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShtb2R1bGVQYXRoLCBzb3VyY2VUZXh0LCB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LCB0cnVlKTtcblxuLy8gICAgIGNvbnN0IGNvbXBvbmVudE1vZHVsZSA9ICcuL2FwcC5jb21wb25lbnQnO1xuXG4vLyAgICAgY29uc3QgaW1wb3J0Q2hhbmdlcyA9IGFkZEltcG9ydFRvTW9kdWxlKHNvdXJjZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUGF0aCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Jyb3dzZXJNb2R1bGUnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlcicpO1xuLy8gICAgIGNvbnN0IGJvb3RzdHJhcENoYW5nZXMgPSBhZGRCb290c3RyYXBUb01vZHVsZShzb3VyY2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBcHBDb21wb25lbnQnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRNb2R1bGUpO1xuLy8gICAgIGNvbnN0IGNoYW5nZXMgPSBbXG4vLyAgICAgICAuLi5pbXBvcnRDaGFuZ2VzLFxuLy8gICAgICAgLi4uYm9vdHN0cmFwQ2hhbmdlcyxcbi8vICAgICBdO1xuXG4vLyAgICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuLy8gICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbi8vICAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbi8vICAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbi8vICAgICByZXR1cm4gaG9zdDtcbi8vICAgfTtcbi8vIH1cblxuZnVuY3Rpb24gbWluaW1hbFBhdGhGaWx0ZXIocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHRvUmVtb3ZlTGlzdDogUmVnRXhwW10gPSBbL2UyZVxcLy8sIC9lZGl0b3Jjb25maWcvLCAvUkVBRE1FLywgL2thcm1hLmNvbmYuanMvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9wcm90cmFjdG9yLmNvbmYuanMvLCAvdGVzdC50cy8sIC90c2NvbmZpZy5zcGVjLmpzb24vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC90c2xpbnQuanNvbi8sIC9mYXZpY29uLmljby9dO1xuXG4gIHJldHVybiAhdG9SZW1vdmVMaXN0LnNvbWUocmUgPT4gcmUudGVzdChwYXRoKSk7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9uczogQXBwbGljYXRpb25PcHRpb25zKTogUnVsZSB7XG4gIC8vIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIC8vIGNvbnN0IGFwcFJvb3RTZWxlY3RvciA9ICdhcHAtcm9vdCc7XG4gICAgLy8gY29uc3QgY29tcG9uZW50T3B0aW9ucyA9ICFvcHRpb25zLm1pbmltYWwgP1xuICAgIC8vICAge1xuICAgIC8vICAgICBpbmxpbmVTdHlsZTogb3B0aW9ucy5pbmxpbmVTdHlsZSxcbiAgICAvLyAgICAgaW5saW5lVGVtcGxhdGU6IG9wdGlvbnMuaW5saW5lVGVtcGxhdGUsXG4gICAgLy8gICAgIHNwZWM6ICFvcHRpb25zLnNraXBUZXN0cyxcbiAgICAvLyAgICAgc3R5bGVleHQ6IG9wdGlvbnMuc3R5bGUsXG4gICAgLy8gICB9IDpcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgaW5saW5lU3R5bGU6IHRydWUsXG4gICAgLy8gICAgIGlubGluZVRlbXBsYXRlOiB0cnVlLFxuICAgIC8vICAgICBzcGVjOiBmYWxzZSxcbiAgICAvLyAgICAgc3R5bGVleHQ6IG9wdGlvbnMuc3R5bGUsXG4gICAgLy8gICB9O1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIG1lcmdlV2l0aChcbiAgICAgICAgYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgICAgICBvcHRpb25zLm1pbmltYWwgPyBmaWx0ZXIobWluaW1hbFBhdGhGaWx0ZXIpIDogbm9vcCgpLFxuICAgICAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgICAgIHV0aWxzOiBzdHJpbmdVdGlscyxcbiAgICAgICAgICAgICdkb3QnOiAnLicsXG4gICAgICAgICAgICAuLi5vcHRpb25zIGFzIG9iamVjdCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBtb3ZlKG9wdGlvbnMuZGlyZWN0b3J5ICEpLFxuICAgICAgICBdKSksXG4gICAgICAvLyBzY2hlbWF0aWMoJ21vZHVsZScsIHtcbiAgICAgIC8vICAgbmFtZTogJ2FwcCcsXG4gICAgICAvLyAgIGNvbW1vbk1vZHVsZTogZmFsc2UsXG4gICAgICAvLyAgIGZsYXQ6IHRydWUsXG4gICAgICAvLyAgIHJvdXRpbmc6IG9wdGlvbnMucm91dGluZyxcbiAgICAgIC8vICAgc291cmNlRGlyOiBvcHRpb25zLmRpcmVjdG9yeSArICcvJyArIG9wdGlvbnMuc291cmNlRGlyLFxuICAgICAgLy8gICBzcGVjOiBmYWxzZSxcbiAgICAgIC8vIH0pLFxuICAgICAgLy8gc2NoZW1hdGljKCdjb21wb25lbnQnLCB7XG4gICAgICAvLyAgIG5hbWU6ICdhcHAnLFxuICAgICAgLy8gICBzZWxlY3RvcjogYXBwUm9vdFNlbGVjdG9yLFxuICAgICAgLy8gICBzb3VyY2VEaXI6IG9wdGlvbnMuZGlyZWN0b3J5ICsgJy8nICsgb3B0aW9ucy5zb3VyY2VEaXIsXG4gICAgICAvLyAgIGZsYXQ6IHRydWUsXG4gICAgICAvLyAgIC4uLmNvbXBvbmVudE9wdGlvbnMsXG4gICAgICAvLyB9KSxcbiAgICAgIC8vIGFkZEJvb3RzdHJhcFRvTmdNb2R1bGUob3B0aW9ucy5kaXJlY3RvcnkgISksXG4gICAgICAvLyBtZXJnZVdpdGgoXG4gICAgICAvLyAgIGFwcGx5KHVybCgnLi9vdGhlci1maWxlcycpLCBbXG4gICAgICAvLyAgICAgY29tcG9uZW50T3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuaHRtbCcpKSA6IG5vb3AoKSxcbiAgICAgIC8vICAgICAhY29tcG9uZW50T3B0aW9ucy5zcGVjID8gZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5zcGVjLnRzJykpIDogbm9vcCgpLFxuICAgICAgLy8gICAgIHRlbXBsYXRlKHtcbiAgICAgIC8vICAgICAgIHV0aWxzOiBzdHJpbmdVdGlscyxcbiAgICAgIC8vICAgICAgIC4uLm9wdGlvbnMgYXMgYW55LCAgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1hbnlcbiAgICAgIC8vICAgICAgIHNlbGVjdG9yOiBhcHBSb290U2VsZWN0b3IsXG4gICAgICAvLyAgICAgICAuLi5jb21wb25lbnRPcHRpb25zLFxuICAgICAgLy8gICAgIH0pLFxuICAgICAgLy8gICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBvcHRpb25zLnNvdXJjZURpciArICcvYXBwJyksXG4gICAgICAvLyAgIF0pLCBNZXJnZVN0cmF0ZWd5Lk92ZXJ3cml0ZSksXG4gICAgLy8gXSkoaG9zdCwgY29udGV4dCk7XG4gIC8vIH1cbiAgXSk7XG59XG4iXX0=