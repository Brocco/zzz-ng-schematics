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
const stringUtils = require("../strings");
function default_1(options) {
    options.prefix = options.prefix ? options.prefix : '';
    options.type = !!options.type ? `.${options.type}` : '';
    const templateSource = schematics_1.apply(schematics_1.url('./files'), [
        schematics_1.template(Object.assign({}, stringUtils, options)),
        schematics_1.move(options.sourceDir),
    ]);
    return schematics_1.chain([
        schematics_1.branchAndMerge(schematics_1.chain([
            schematics_1.mergeWith(templateSource),
        ])),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2ludGVyZmFjZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILDhFQUE4RTtBQUM5RSx3QkFBd0I7QUFDeEIsMkRBU29DO0FBQ3BDLDBDQUEwQztBQUcxQyxtQkFBeUIsT0FBWTtJQUNuQyxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDdEQsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFFeEQsTUFBTSxjQUFjLEdBQUcsa0JBQUssQ0FBQyxnQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzNDLHFCQUFRLG1CQUNILFdBQVcsRUFDWCxPQUFPLEVBQ1Y7UUFDRixpQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLGtCQUFLLENBQUM7UUFDWCwyQkFBYyxDQUFDLGtCQUFLLENBQUM7WUFDbkIsc0JBQVMsQ0FBQyxjQUFjLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpCRCw0QkFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyBUT0RPOiByZXBsYWNlIGBvcHRpb25zOiBhbnlgIHdpdGggYW4gYWN0dWFsIHR5cGUgZ2VuZXJhdGVkIGZyb20gdGhlIHNjaGVtYS5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWFueVxuaW1wb3J0IHtcbiAgUnVsZSxcbiAgYXBwbHksXG4gIGJyYW5jaEFuZE1lcmdlLFxuICBjaGFpbixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgKiBhcyBzdHJpbmdVdGlscyBmcm9tICcuLi9zdHJpbmdzJztcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9uczogYW55KTogUnVsZSB7XG4gIG9wdGlvbnMucHJlZml4ID0gb3B0aW9ucy5wcmVmaXggPyBvcHRpb25zLnByZWZpeCA6ICcnO1xuICBvcHRpb25zLnR5cGUgPSAhIW9wdGlvbnMudHlwZSA/IGAuJHtvcHRpb25zLnR5cGV9YCA6ICcnO1xuXG4gIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICB0ZW1wbGF0ZSh7XG4gICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfSksXG4gICAgbW92ZShvcHRpb25zLnNvdXJjZURpciksXG4gIF0pO1xuXG4gIHJldHVybiBjaGFpbihbXG4gICAgYnJhbmNoQW5kTWVyZ2UoY2hhaW4oW1xuICAgICAgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKSxcbiAgICBdKSksXG4gIF0pO1xufVxuIl19