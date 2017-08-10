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
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2FwcGxpY2F0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsOEVBQThFO0FBQzlFLHdCQUF3QjtBQUN4QiwyREFhb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLDBDQUEwQztBQUMxQyxrRkFBa0Y7QUFDbEYsb0RBQW9EO0FBR3BELDZEQUE2RDtBQUM3RCw2QkFBNkI7QUFDN0IsK0RBQStEO0FBQy9ELG9FQUFvRTtBQUNwRSxnR0FBZ0c7QUFFaEcsaURBQWlEO0FBRWpELHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsK0RBQStEO0FBQy9ELDRFQUE0RTtBQUM1RSw0REFBNEQ7QUFDNUQsZ0VBQWdFO0FBQ2hFLG9FQUFvRTtBQUNwRSxzRUFBc0U7QUFDdEUsd0JBQXdCO0FBQ3hCLDBCQUEwQjtBQUMxQiw2QkFBNkI7QUFDN0IsU0FBUztBQUVULHFEQUFxRDtBQUNyRCxzQ0FBc0M7QUFDdEMsOENBQThDO0FBQzlDLHlEQUF5RDtBQUN6RCxVQUFVO0FBQ1YsUUFBUTtBQUNSLG1DQUFtQztBQUVuQyxtQkFBbUI7QUFDbkIsT0FBTztBQUNQLElBQUk7QUFFSiwyQkFBMkIsSUFBWTtJQUNyQyxNQUFNLFlBQVksR0FBYSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGVBQWU7UUFDbEQsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLG9CQUFvQjtRQUNyRCxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFOUQsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxtQkFBeUIsT0FBWTtJQUNuQyxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7SUFDbkMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPO1FBQ3pDO1lBQ0UsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLGNBQWMsRUFBRSxPQUFPLENBQUMsY0FBYztZQUN0QyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUztZQUN4QixRQUFRLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDeEI7UUFDRDtZQUNFLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLElBQUksRUFBRSxLQUFLO1lBQ1gsUUFBUSxFQUFFLE9BQU8sQ0FBQyxLQUFLO1NBQ3hCLENBQUM7SUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsa0JBQ3pCLEtBQUssRUFBRSxXQUFXLElBQ2YsT0FBTyxJQUNWLFFBQVEsRUFBRSxlQUFlLElBQ3RCLGdCQUFnQixFQUNuQixDQUFDO0lBQ0QsTUFBTSxDQUFDLGtCQUFLLENBQUM7UUFDWCxzQkFBUyxDQUNQLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsT0FBTyxHQUFHLG1CQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxpQkFBSSxFQUFFO1lBQ3BELHFCQUFRLGlCQUNOLEtBQUssRUFBRSxXQUFXLEVBQ2xCLEtBQUssRUFBRSxHQUFHLElBQ1AsT0FBTyxFQUFHO1lBQ2YsaUJBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQ3hCLENBQUMsQ0FBQztRQUNMLHNCQUFTLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksRUFBRSxLQUFLO1lBQ1gsWUFBWSxFQUFFLEtBQUs7WUFDbkIsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDeEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTO1lBQ3RELElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQztLQXFCSCxDQUFDLENBQUM7QUFDTCxDQUFDO0FBNURELDRCQTREQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIFRPRE86IHJlcGxhY2UgYG9wdGlvbnM6IGFueWAgd2l0aCBhbiBhY3R1YWwgdHlwZSBnZW5lcmF0ZWQgZnJvbSB0aGUgc2NoZW1hLlxuLy8gdHNsaW50OmRpc2FibGU6bm8tYW55XG5pbXBvcnQge1xuICAvLyBNZXJnZVN0cmF0ZWd5LFxuICBSdWxlLFxuICAvLyBUcmVlLFxuICBhcHBseSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICBzY2hlbWF0aWMsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbi8vIGltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0ICogYXMgc3RyaW5nVXRpbHMgZnJvbSAnLi4vc3RyaW5ncyc7XG4vLyBpbXBvcnQgeyBhZGRCb290c3RyYXBUb01vZHVsZSwgYWRkSW1wb3J0VG9Nb2R1bGUgfSBmcm9tICcuLi91dGlsaXR5L2FzdC11dGlscyc7XG4vLyBpbXBvcnQgeyBJbnNlcnRDaGFuZ2UgfSBmcm9tICcuLi91dGlsaXR5L2NoYW5nZSc7XG5cblxuLy8gZnVuY3Rpb24gYWRkQm9vdHN0cmFwVG9OZ01vZHVsZShkaXJlY3Rvcnk6IHN0cmluZyk6IFJ1bGUge1xuLy8gICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbi8vICAgICBjb25zdCBtb2R1bGVQYXRoID0gYCR7ZGlyZWN0b3J5fS9zcmMvYXBwL2FwcC5tb2R1bGUudHNgO1xuLy8gICAgIGNvbnN0IHNvdXJjZVRleHQgPSBob3N0LnJlYWQobW9kdWxlUGF0aCkgIS50b1N0cmluZygndXRmLTgnKTtcbi8vICAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKG1vZHVsZVBhdGgsIHNvdXJjZVRleHQsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsIHRydWUpO1xuXG4vLyAgICAgY29uc3QgY29tcG9uZW50TW9kdWxlID0gJy4vYXBwLmNvbXBvbmVudCc7XG5cbi8vICAgICBjb25zdCBpbXBvcnRDaGFuZ2VzID0gYWRkSW1wb3J0VG9Nb2R1bGUoc291cmNlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVQYXRoLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQnJvd3Nlck1vZHVsZScsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJyk7XG4vLyAgICAgY29uc3QgYm9vdHN0cmFwQ2hhbmdlcyA9IGFkZEJvb3RzdHJhcFRvTW9kdWxlKHNvdXJjZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUGF0aCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FwcENvbXBvbmVudCcsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE1vZHVsZSk7XG4vLyAgICAgY29uc3QgY2hhbmdlcyA9IFtcbi8vICAgICAgIC4uLmltcG9ydENoYW5nZXMsXG4vLyAgICAgICAuLi5ib290c3RyYXBDaGFuZ2VzLFxuLy8gICAgIF07XG5cbi8vICAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4vLyAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuLy8gICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuLy8gICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuLy8gICAgIHJldHVybiBob3N0O1xuLy8gICB9O1xuLy8gfVxuXG5mdW5jdGlvbiBtaW5pbWFsUGF0aEZpbHRlcihwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgdG9SZW1vdmVMaXN0OiBSZWdFeHBbXSA9IFsvZTJlXFwvLywgL2VkaXRvcmNvbmZpZy8sIC9SRUFETUUvLCAva2FybWEuY29uZi5qcy8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL3Byb3RyYWN0b3IuY29uZi5qcy8sIC90ZXN0LnRzLywgL3RzY29uZmlnLnNwZWMuanNvbi8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL3RzbGludC5qc29uLywgL2Zhdmljb24uaWNvL107XG5cbiAgcmV0dXJuICF0b1JlbW92ZUxpc3Quc29tZShyZSA9PiByZS50ZXN0KHBhdGgpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnM6IGFueSk6IFJ1bGUge1xuICBjb25zdCBhcHBSb290U2VsZWN0b3IgPSAnYXBwLXJvb3QnO1xuICBjb25zdCBjb21wb25lbnRPcHRpb25zID0gIW9wdGlvbnMubWluaW1hbCA/XG4gIHtcbiAgICBpbmxpbmVTdHlsZTogb3B0aW9ucy5pbmxpbmVTdHlsZSxcbiAgICBpbmxpbmVUZW1wbGF0ZTogb3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSxcbiAgICBzcGVjOiAhb3B0aW9ucy5za2lwVGVzdHMsXG4gICAgc3R5bGVleHQ6IG9wdGlvbnMuc3R5bGUsXG4gIH0gOlxuICB7XG4gICAgaW5saW5lU3R5bGU6IHRydWUsXG4gICAgaW5saW5lVGVtcGxhdGU6IHRydWUsXG4gICAgc3BlYzogZmFsc2UsXG4gICAgc3R5bGVleHQ6IG9wdGlvbnMuc3R5bGUsXG4gIH07XG5jb25zb2xlLmxvZygnb3RoZXIgZmlsZXM6ICcsIHtcbiAgdXRpbHM6IHN0cmluZ1V0aWxzLFxuICAuLi5vcHRpb25zLFxuICBzZWxlY3RvcjogYXBwUm9vdFNlbGVjdG9yLFxuICAuLi5jb21wb25lbnRPcHRpb25zLFxufSk7XG4gIHJldHVybiBjaGFpbihbXG4gICAgbWVyZ2VXaXRoKFxuICAgICAgYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgICAgb3B0aW9ucy5taW5pbWFsID8gZmlsdGVyKG1pbmltYWxQYXRoRmlsdGVyKSA6IG5vb3AoKSxcbiAgICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAgIHV0aWxzOiBzdHJpbmdVdGlscyxcbiAgICAgICAgICAnZG90JzogJy4nLFxuICAgICAgICAgIC4uLm9wdGlvbnMgfSksXG4gICAgICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkpLFxuICAgICAgXSkpLFxuICAgIHNjaGVtYXRpYygnbW9kdWxlJywge1xuICAgICAgbmFtZTogJ2FwcCcsXG4gICAgICBjb21tb25Nb2R1bGU6IGZhbHNlLFxuICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgIHJvdXRpbmc6IG9wdGlvbnMucm91dGluZyxcbiAgICAgIHNvdXJjZURpcjogb3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBvcHRpb25zLnNvdXJjZURpcixcbiAgICAgIHNwZWM6IGZhbHNlLFxuICAgIH0pLFxuICAgIC8vIHNjaGVtYXRpYygnY29tcG9uZW50Jywge1xuICAgIC8vICAgbmFtZTogJ2FwcCcsXG4gICAgLy8gICBzZWxlY3RvcjogYXBwUm9vdFNlbGVjdG9yLFxuICAgIC8vICAgc291cmNlRGlyOiBvcHRpb25zLmRpcmVjdG9yeSArICcvJyArIG9wdGlvbnMuc291cmNlRGlyLFxuICAgIC8vICAgZmxhdDogdHJ1ZSxcbiAgICAvLyAgIC4uLmNvbXBvbmVudE9wdGlvbnMsXG4gICAgLy8gfSksXG4gICAgLy8gYWRkQm9vdHN0cmFwVG9OZ01vZHVsZShvcHRpb25zLmRpcmVjdG9yeSksXG4gICAgLy8gbWVyZ2VXaXRoKFxuICAgIC8vICAgYXBwbHkodXJsKCcuL290aGVyLWZpbGVzJyksIFtcbiAgICAvLyAgICAgY29tcG9uZW50T3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuaHRtbCcpKSA6IG5vb3AoKSxcbiAgICAvLyAgICAgIWNvbXBvbmVudE9wdGlvbnMuc3BlYyA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuc3BlYy50cycpKSA6IG5vb3AoKSxcbiAgICAvLyAgICAgdGVtcGxhdGUoe1xuICAgIC8vICAgICAgIHV0aWxzOiBzdHJpbmdVdGlscyxcbiAgICAvLyAgICAgICAuLi5vcHRpb25zLFxuICAgIC8vICAgICAgIHNlbGVjdG9yOiBhcHBSb290U2VsZWN0b3IsXG4gICAgLy8gICAgICAgLi4uY29tcG9uZW50T3B0aW9ucyxcbiAgICAvLyAgICAgfSksXG4gICAgLy8gICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBvcHRpb25zLnNvdXJjZURpciArICcvYXBwJyksXG4gICAgLy8gICBdKSwgTWVyZ2VTdHJhdGVneS5PdmVyd3JpdGUpLFxuICBdKTtcbn1cbiJdfQ==