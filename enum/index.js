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
const stringUtils = require("../strings");
function default_1(options) {
    // options.path = options.path ? normalizePath(options.path) : options.path;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2VudW0vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0VBTUU7QUFDRiwyREFVb0M7QUFDcEMsMENBQTBDO0FBSTFDLG1CQUF5QixPQUFvQjtJQUMzQyw0RUFBNEU7SUFFNUUsTUFBTSxjQUFjLEdBQUcsa0JBQUssQ0FBQyxnQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzNDLHFCQUFRLG1CQUNILFdBQVcsRUFDWCxPQUFpQixFQUNwQjtRQUNGLGlCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVcsQ0FBQztLQUMxQixDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsa0JBQUssQ0FBQztRQUNYLDJCQUFjLENBQUMsa0JBQUssQ0FBQztZQUNuQixzQkFBUyxDQUFDLGNBQWMsQ0FBQztTQUMxQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7QUFDTCxDQUFDO0FBaEJELDRCQWdCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBAbGljZW5zZVxuKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbipcbiogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuKi9cbmltcG9ydCB7XG4gIFJ1bGUsXG4gIGFwcGx5LFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgLy8gbm9ybWFsaXplUGF0aCxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICogYXMgc3RyaW5nVXRpbHMgZnJvbSAnLi4vc3RyaW5ncyc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgRW51bU9wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnM6IEVudW1PcHRpb25zKTogUnVsZSB7XG4gIC8vIG9wdGlvbnMucGF0aCA9IG9wdGlvbnMucGF0aCA/IG5vcm1hbGl6ZVBhdGgob3B0aW9ucy5wYXRoKSA6IG9wdGlvbnMucGF0aDtcblxuICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgdGVtcGxhdGUoe1xuICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAuLi5vcHRpb25zIGFzIG9iamVjdCxcbiAgICB9KSxcbiAgICBtb3ZlKG9wdGlvbnMuc291cmNlRGlyICEpLFxuICBdKTtcblxuICByZXR1cm4gY2hhaW4oW1xuICAgIGJyYW5jaEFuZE1lcmdlKGNoYWluKFtcbiAgICAgIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSksXG4gICAgXSkpLFxuICBdKTtcbn1cbiJdfQ==