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
// import * as ts from 'typescript';
const stringUtils = require("../strings");
// import { addBootstrapToModule, addImportToModule } from '../utility/ast-utils';
// import { InsertChange } from '../utility/change';
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
    console.log('other files: ', Object.assign({ utils: stringUtils }, options, { selector: appRootSelector }, componentOptions));
    return schematics_1.chain([
        schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
            options.minimal ? schematics_1.filter(minimalPathFilter) : schematics_1.noop(),
            schematics_1.template(Object.assign({ utils: stringUtils, 'dot': '.' }, options, componentOptions)),
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
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2FwcGxpY2F0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsOEVBQThFO0FBQzlFLHdCQUF3QjtBQUN4QiwyREFhb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLDBDQUEwQztBQUMxQyxrRkFBa0Y7QUFDbEYsb0RBQW9EO0FBR3BELDZEQUE2RDtBQUM3RCw2QkFBNkI7QUFDN0IsK0RBQStEO0FBQy9ELG9FQUFvRTtBQUNwRSxnR0FBZ0c7QUFFaEcsaURBQWlEO0FBRWpELHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsK0RBQStEO0FBQy9ELDRFQUE0RTtBQUM1RSw0REFBNEQ7QUFDNUQsZ0VBQWdFO0FBQ2hFLG9FQUFvRTtBQUNwRSxzRUFBc0U7QUFDdEUsd0JBQXdCO0FBQ3hCLDBCQUEwQjtBQUMxQiw2QkFBNkI7QUFDN0IsU0FBUztBQUVULHFEQUFxRDtBQUNyRCxzQ0FBc0M7QUFDdEMsOENBQThDO0FBQzlDLHlEQUF5RDtBQUN6RCxVQUFVO0FBQ1YsUUFBUTtBQUNSLG1DQUFtQztBQUVuQyxtQkFBbUI7QUFDbkIsT0FBTztBQUNQLElBQUk7QUFFSiwyQkFBMkIsSUFBWTtJQUNyQyxNQUFNLFlBQVksR0FBYSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGVBQWU7UUFDbEQsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLG9CQUFvQjtRQUNyRCxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFOUQsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxtQkFBeUIsT0FBWTtJQUNuQyxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7SUFDbkMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPO1FBQ3pDO1lBQ0UsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLGNBQWMsRUFBRSxPQUFPLENBQUMsY0FBYztZQUN0QyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUztZQUN4QixRQUFRLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDeEI7UUFDRDtZQUNFLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLElBQUksRUFBRSxLQUFLO1lBQ1gsUUFBUSxFQUFFLE9BQU8sQ0FBQyxLQUFLO1NBQ3hCLENBQUM7SUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsa0JBQ3pCLEtBQUssRUFBRSxXQUFXLElBQ2YsT0FBTyxJQUNWLFFBQVEsRUFBRSxlQUFlLElBQ3RCLGdCQUFnQixFQUNuQixDQUFDO0lBQ0QsTUFBTSxDQUFDLGtCQUFLLENBQUM7UUFDWCxzQkFBUyxDQUNQLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsT0FBTyxHQUFHLG1CQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxpQkFBSSxFQUFFO1lBQ3BELHFCQUFRLGlCQUNOLEtBQUssRUFBRSxXQUFXLEVBQ2xCLEtBQUssRUFBRSxHQUFHLElBQ1AsT0FBTyxFQUNQLGdCQUFnQixFQUFHO1lBQ3hCLGlCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztTQUN4QixDQUFDLENBQUM7UUFDTCxzQkFBUyxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLEVBQUUsS0FBSztZQUNYLFlBQVksRUFBRSxLQUFLO1lBQ25CLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUztZQUN0RCxJQUFJLEVBQUUsS0FBSztTQUNaLENBQUM7S0FxQkgsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTdERCw0QkE2REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyBUT0RPOiByZXBsYWNlIGBvcHRpb25zOiBhbnlgIHdpdGggYW4gYWN0dWFsIHR5cGUgZ2VuZXJhdGVkIGZyb20gdGhlIHNjaGVtYS5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWFueVxuaW1wb3J0IHtcbiAgLy8gTWVyZ2VTdHJhdGVneSxcbiAgUnVsZSxcbiAgLy8gVHJlZSxcbiAgYXBwbHksXG4gIGNoYWluLFxuICBmaWx0ZXIsXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgbm9vcCxcbiAgc2NoZW1hdGljLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG4vLyBpbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCAqIGFzIHN0cmluZ1V0aWxzIGZyb20gJy4uL3N0cmluZ3MnO1xuLy8gaW1wb3J0IHsgYWRkQm9vdHN0cmFwVG9Nb2R1bGUsIGFkZEltcG9ydFRvTW9kdWxlIH0gZnJvbSAnLi4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuLy8gaW1wb3J0IHsgSW5zZXJ0Q2hhbmdlIH0gZnJvbSAnLi4vdXRpbGl0eS9jaGFuZ2UnO1xuXG5cbi8vIGZ1bmN0aW9uIGFkZEJvb3RzdHJhcFRvTmdNb2R1bGUoZGlyZWN0b3J5OiBzdHJpbmcpOiBSdWxlIHtcbi8vICAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4vLyAgICAgY29uc3QgbW9kdWxlUGF0aCA9IGAke2RpcmVjdG9yeX0vc3JjL2FwcC9hcHAubW9kdWxlLnRzYDtcbi8vICAgICBjb25zdCBzb3VyY2VUZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpICEudG9TdHJpbmcoJ3V0Zi04Jyk7XG4vLyAgICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShtb2R1bGVQYXRoLCBzb3VyY2VUZXh0LCB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LCB0cnVlKTtcblxuLy8gICAgIGNvbnN0IGNvbXBvbmVudE1vZHVsZSA9ICcuL2FwcC5jb21wb25lbnQnO1xuXG4vLyAgICAgY29uc3QgaW1wb3J0Q2hhbmdlcyA9IGFkZEltcG9ydFRvTW9kdWxlKHNvdXJjZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUGF0aCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Jyb3dzZXJNb2R1bGUnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlcicpO1xuLy8gICAgIGNvbnN0IGJvb3RzdHJhcENoYW5nZXMgPSBhZGRCb290c3RyYXBUb01vZHVsZShzb3VyY2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBcHBDb21wb25lbnQnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRNb2R1bGUpO1xuLy8gICAgIGNvbnN0IGNoYW5nZXMgPSBbXG4vLyAgICAgICAuLi5pbXBvcnRDaGFuZ2VzLFxuLy8gICAgICAgLi4uYm9vdHN0cmFwQ2hhbmdlcyxcbi8vICAgICBdO1xuXG4vLyAgICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuLy8gICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbi8vICAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbi8vICAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbi8vICAgICByZXR1cm4gaG9zdDtcbi8vICAgfTtcbi8vIH1cblxuZnVuY3Rpb24gbWluaW1hbFBhdGhGaWx0ZXIocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHRvUmVtb3ZlTGlzdDogUmVnRXhwW10gPSBbL2UyZVxcLy8sIC9lZGl0b3Jjb25maWcvLCAvUkVBRE1FLywgL2thcm1hLmNvbmYuanMvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9wcm90cmFjdG9yLmNvbmYuanMvLCAvdGVzdC50cy8sIC90c2NvbmZpZy5zcGVjLmpzb24vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC90c2xpbnQuanNvbi8sIC9mYXZpY29uLmljby9dO1xuXG4gIHJldHVybiAhdG9SZW1vdmVMaXN0LnNvbWUocmUgPT4gcmUudGVzdChwYXRoKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb25zOiBhbnkpOiBSdWxlIHtcbiAgY29uc3QgYXBwUm9vdFNlbGVjdG9yID0gJ2FwcC1yb290JztcbiAgY29uc3QgY29tcG9uZW50T3B0aW9ucyA9ICFvcHRpb25zLm1pbmltYWwgP1xuICB7XG4gICAgaW5saW5lU3R5bGU6IG9wdGlvbnMuaW5saW5lU3R5bGUsXG4gICAgaW5saW5lVGVtcGxhdGU6IG9wdGlvbnMuaW5saW5lVGVtcGxhdGUsXG4gICAgc3BlYzogIW9wdGlvbnMuc2tpcFRlc3RzLFxuICAgIHN0eWxlZXh0OiBvcHRpb25zLnN0eWxlLFxuICB9IDpcbiAge1xuICAgIGlubGluZVN0eWxlOiB0cnVlLFxuICAgIGlubGluZVRlbXBsYXRlOiB0cnVlLFxuICAgIHNwZWM6IGZhbHNlLFxuICAgIHN0eWxlZXh0OiBvcHRpb25zLnN0eWxlLFxuICB9O1xuY29uc29sZS5sb2coJ290aGVyIGZpbGVzOiAnLCB7XG4gIHV0aWxzOiBzdHJpbmdVdGlscyxcbiAgLi4ub3B0aW9ucyxcbiAgc2VsZWN0b3I6IGFwcFJvb3RTZWxlY3RvcixcbiAgLi4uY29tcG9uZW50T3B0aW9ucyxcbn0pO1xuICByZXR1cm4gY2hhaW4oW1xuICAgIG1lcmdlV2l0aChcbiAgICAgIGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgICAgIG9wdGlvbnMubWluaW1hbCA/IGZpbHRlcihtaW5pbWFsUGF0aEZpbHRlcikgOiBub29wKCksXG4gICAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgICB1dGlsczogc3RyaW5nVXRpbHMsXG4gICAgICAgICAgJ2RvdCc6ICcuJyxcbiAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgIC4uLmNvbXBvbmVudE9wdGlvbnMgfSksXG4gICAgICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkpLFxuICAgICAgXSkpLFxuICAgIHNjaGVtYXRpYygnbW9kdWxlJywge1xuICAgICAgbmFtZTogJ2FwcCcsXG4gICAgICBjb21tb25Nb2R1bGU6IGZhbHNlLFxuICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgIHJvdXRpbmc6IG9wdGlvbnMucm91dGluZyxcbiAgICAgIHNvdXJjZURpcjogb3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBvcHRpb25zLnNvdXJjZURpcixcbiAgICAgIHNwZWM6IGZhbHNlLFxuICAgIH0pLFxuICAgIC8vIHNjaGVtYXRpYygnY29tcG9uZW50Jywge1xuICAgIC8vICAgbmFtZTogJ2FwcCcsXG4gICAgLy8gICBzZWxlY3RvcjogYXBwUm9vdFNlbGVjdG9yLFxuICAgIC8vICAgc291cmNlRGlyOiBvcHRpb25zLmRpcmVjdG9yeSArICcvJyArIG9wdGlvbnMuc291cmNlRGlyLFxuICAgIC8vICAgZmxhdDogdHJ1ZSxcbiAgICAvLyAgIC4uLmNvbXBvbmVudE9wdGlvbnMsXG4gICAgLy8gfSksXG4gICAgLy8gYWRkQm9vdHN0cmFwVG9OZ01vZHVsZShvcHRpb25zLmRpcmVjdG9yeSksXG4gICAgLy8gbWVyZ2VXaXRoKFxuICAgIC8vICAgYXBwbHkodXJsKCcuL290aGVyLWZpbGVzJyksIFtcbiAgICAvLyAgICAgY29tcG9uZW50T3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuaHRtbCcpKSA6IG5vb3AoKSxcbiAgICAvLyAgICAgIWNvbXBvbmVudE9wdGlvbnMuc3BlYyA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuc3BlYy50cycpKSA6IG5vb3AoKSxcbiAgICAvLyAgICAgdGVtcGxhdGUoe1xuICAgIC8vICAgICAgIHV0aWxzOiBzdHJpbmdVdGlscyxcbiAgICAvLyAgICAgICAuLi5vcHRpb25zLFxuICAgIC8vICAgICAgIHNlbGVjdG9yOiBhcHBSb290U2VsZWN0b3IsXG4gICAgLy8gICAgICAgLi4uY29tcG9uZW50T3B0aW9ucyxcbiAgICAvLyAgICAgfSksXG4gICAgLy8gICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBvcHRpb25zLnNvdXJjZURpciArICcvYXBwJyksXG4gICAgLy8gICBdKSwgTWVyZ2VTdHJhdGVneS5PdmVyd3JpdGUpLFxuICBdKTtcbn1cbiJdfQ==