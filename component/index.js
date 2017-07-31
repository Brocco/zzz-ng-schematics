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
require("rxjs/add/operator/merge");
const ts = require("typescript");
const stringUtils = require("../strings");
const ast_utils_1 = require("../utility/ast-utils");
const change_1 = require("../utility/change");
const find_module_1 = require("../utility/find-module");
function addDeclarationToNgModule(options) {
    return (host) => {
        if (options.skipImport) {
            return host;
        }
        let modulePath;
        if (options.module) {
            if (!host.exists(options.module)) {
                throw new Error(`Module specified (${options.module}) does not exist.`);
            }
            modulePath = options.module;
        }
        else {
            let pathToCheck = options.sourceDir + '/' + options.path;
            pathToCheck += options.flat ? '' : '/' + stringUtils.dasherize(options.name);
            modulePath = find_module_1.findModule(host, pathToCheck);
        }
        const sourceText = host.read(modulePath).toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const componentPath = `/${options.sourceDir}/${options.path}/`
            + (options.flat ? '' : stringUtils.dasherize(options.name) + '/')
            + stringUtils.dasherize(options.name)
            + '.component';
        const relativePath = find_module_1.buildRelativePath(modulePath, componentPath);
        const declarationChanges = ast_utils_1.addDeclarationToModule(source, modulePath, stringUtils.classify(`${options.name}Component`), relativePath);
        let exportChanges = [];
        if (options.export) {
            exportChanges = ast_utils_1.addExportToModule(source, modulePath, stringUtils.classify(`${options.name}Component`), relativePath);
        }
        const recorder = host.beginUpdate(modulePath);
        const changes = [...declarationChanges, ...exportChanges];
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function buildSelector(options) {
    let selector = stringUtils.dasherize(options.name);
    if (options.prefix) {
        selector = `${options.prefix}-${selector}`;
    }
    return selector;
}
function default_1(options) {
    options.selector = options.selector || buildSelector(options);
    const templateSource = schematics_1.apply(schematics_1.url('./files'), [
        options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith('.spec.ts')),
        options.inlineStyle ? schematics_1.filter(path => !path.endsWith('.__styleext__')) : schematics_1.noop(),
        options.inlineTemplate ? schematics_1.filter(path => !path.endsWith('.html')) : schematics_1.noop(),
        schematics_1.template(Object.assign({}, stringUtils, { 'if-flat': (s) => options.flat ? '' : s }, options)),
        schematics_1.move(options.sourceDir),
    ]);
    return schematics_1.chain([
        schematics_1.branchAndMerge(schematics_1.chain([
            schematics_1.filter(path => path.endsWith('.module.ts') && !path.endsWith('-routing.module.ts')),
            addDeclarationToNgModule(options),
            schematics_1.mergeWith(templateSource),
        ])),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2NvbXBvbmVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILDhFQUE4RTtBQUM5RSx3QkFBd0I7QUFDeEIsMkRBWW9DO0FBQ3BDLG1DQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsMENBQTBDO0FBQzFDLG9EQUFpRjtBQUNqRiw4Q0FBeUQ7QUFDekQsd0RBQXVFO0FBR3ZFLGtDQUFrQyxPQUFZO0lBQzVDLE1BQU0sQ0FBQyxDQUFDLElBQVU7UUFDaEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLFVBQVUsQ0FBQztRQUNmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixPQUFPLENBQUMsTUFBTSxtQkFBbUIsQ0FBQyxDQUFDO1lBQzFFLENBQUM7WUFDRCxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3pELFdBQVcsSUFBSSxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0UsVUFBVSxHQUFH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LENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLGlCQUFJLEVBQUU7UUFDOUUsT0FBTyxDQUFDLGNBQWMsR0FBRyxtQkFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxpQkFBSSxFQUFFO1FBQ3pFLHFCQUFRLG1CQUNILFdBQVcsSUFDZCxTQUFTLEVBQUUsQ0FBQyxDQUFTLEtBQUssT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUM1QyxPQUFPLEVBQ1Y7UUFDRixpQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLGtCQUFLLENBQUM7UUFDWCwyQkFBYyxDQUFDLGtCQUFLLENBQUM7WUFDbkIsbUJBQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNuRix3QkFBd0IsQ0FBQyxPQUFPLENBQUM7WUFDakMsc0JBQVMsQ0FBQyxjQUFjLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXRCRCw0QkFzQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyBUT0RPOiByZXBsYWNlIGBvcHRpb25zOiBhbnlgIHdpdGggYW4gYWN0dWFsIHR5cGUgZ2VuZXJhdGVkIGZyb20gdGhlIHNjaGVtYS5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWFueVxuaW1wb3J0IHtcbiAgUnVsZSxcbiAgVHJlZSxcbiAgYXBwbHksXG4gIGJyYW5jaEFuZE1lcmdlLFxuICBjaGFpbixcbiAgZmlsdGVyLFxuICBtZXJnZVdpdGgsXG4gIG1vdmUsXG4gIG5vb3AsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWVyZ2UnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgKiBhcyBzdHJpbmdVdGlscyBmcm9tICcuLi9zdHJpbmdzJztcbmltcG9ydCB7IGFkZERlY2xhcmF0aW9uVG9Nb2R1bGUsIGFkZEV4cG9ydFRvTW9kdWxlIH0gZnJvbSAnLi4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuaW1wb3J0IHsgSW5zZXJ0Q2hhbmdlLCBDaGFuZ2UgfSBmcm9tICcuLi91dGlsaXR5L2NoYW5nZSc7XG5pbXBvcnQgeyBidWlsZFJlbGF0aXZlUGF0aCwgZmluZE1vZHVsZSB9IGZyb20gJy4uL3V0aWxpdHkvZmluZC1tb2R1bGUnO1xuXG5cbmZ1bmN0aW9uIGFkZERlY2xhcmF0aW9uVG9OZ01vZHVsZShvcHRpb25zOiBhbnkpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgaWYgKG9wdGlvbnMuc2tpcEltcG9ydCkge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgbGV0IG1vZHVsZVBhdGg7XG4gICAgaWYgKG9wdGlvbnMubW9kdWxlKSB7XG4gICAgICBpZiAoIWhvc3QuZXhpc3RzKG9wdGlvbnMubW9kdWxlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1vZHVsZSBzcGVjaWZpZWQgKCR7b3B0aW9ucy5tb2R1bGV9KSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICAgIH1cbiAgICAgIG1vZHVsZVBhdGggPSBvcHRpb25zLm1vZHVsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBhdGhUb0NoZWNrID0gb3B0aW9ucy5zb3VyY2VEaXIgKyAnLycgKyBvcHRpb25zLnBhdGg7XG4gICAgICBwYXRoVG9DaGVjayArPSBvcHRpb25zLmZsYXQgPyAnJyA6ICcvJyArIHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpO1xuICAgICAgbW9kdWxlUGF0aCA9IGZpbmRNb2R1bGUoaG9zdCwgcGF0aFRvQ2hlY2spO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZVRleHQgPSBob3N0LnJlYWQobW9kdWxlUGF0aCkgIS50b1N0cmluZygndXRmLTgnKTtcbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKG1vZHVsZVBhdGgsIHNvdXJjZVRleHQsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsIHRydWUpO1xuXG4gICAgY29uc3QgY29tcG9uZW50UGF0aCA9IGAvJHtvcHRpb25zLnNvdXJjZURpcn0vJHtvcHRpb25zLnBhdGh9L2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyAob3B0aW9ucy5mbGF0ID8gJycgOiBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArICcvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICArICcuY29tcG9uZW50JztcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChtb2R1bGVQYXRoLCBjb21wb25lbnRQYXRoKTtcbiAgICBjb25zdCBkZWNsYXJhdGlvbkNoYW5nZXMgPSBhZGREZWNsYXJhdGlvblRvTW9kdWxlKHNvdXJjZSwgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdVdGlscy5jbGFzc2lmeShgJHtvcHRpb25zLm5hbWV9Q29tcG9uZW50YCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoKTtcbiAgICBsZXQgZXhwb3J0Q2hhbmdlczogQ2hhbmdlW10gPSBbXTtcbiAgICBpZiAob3B0aW9ucy5leHBvcnQpIHtcbiAgICAgIGV4cG9ydENoYW5nZXMgPSBhZGRFeHBvcnRUb01vZHVsZShzb3VyY2UsIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nVXRpbHMuY2xhc3NpZnkoYCR7b3B0aW9ucy5uYW1lfUNvbXBvbmVudGApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aCk7XG4gICAgfVxuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShtb2R1bGVQYXRoKTtcblxuICAgIGNvbnN0IGNoYW5nZXMgPSBbLi4uZGVjbGFyYXRpb25DaGFuZ2VzLCAuLi5leHBvcnRDaGFuZ2VzXTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cblxuZnVuY3Rpb24gYnVpbGRTZWxlY3RvcihvcHRpb25zOiBhbnkpIHtcbiAgbGV0IHNlbGVjdG9yID0gc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSk7XG4gIGlmIChvcHRpb25zLnByZWZpeCkge1xuICAgIHNlbGVjdG9yID0gYCR7b3B0aW9ucy5wcmVmaXh9LSR7c2VsZWN0b3J9YDtcbiAgfVxuXG4gIHJldHVybiBzZWxlY3Rvcjtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBhbnkpOiBSdWxlIHtcbiAgb3B0aW9ucy5zZWxlY3RvciA9IG9wdGlvbnMuc2VsZWN0b3IgfHwgYnVpbGRTZWxlY3RvcihvcHRpb25zKTtcblxuICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgb3B0aW9ucy5zcGVjID8gbm9vcCgpIDogZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5zcGVjLnRzJykpLFxuICAgIG9wdGlvbnMuaW5saW5lU3R5bGUgPyBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLl9fc3R5bGVleHRfXycpKSA6IG5vb3AoKSxcbiAgICBvcHRpb25zLmlubGluZVRlbXBsYXRlID8gZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5odG1sJykpIDogbm9vcCgpLFxuICAgIHRlbXBsYXRlKHtcbiAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PiBvcHRpb25zLmZsYXQgPyAnJyA6IHMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH0pLFxuICAgIG1vdmUob3B0aW9ucy5zb3VyY2VEaXIpLFxuICBdKTtcblxuICByZXR1cm4gY2hhaW4oW1xuICAgIGJyYW5jaEFuZE1lcmdlKGNoYWluKFtcbiAgICAgIGZpbHRlcihwYXRoID0+IHBhdGguZW5kc1dpdGgoJy5tb2R1bGUudHMnKSAmJiAhcGF0aC5lbmRzV2l0aCgnLXJvdXRpbmcubW9kdWxlLnRzJykpLFxuICAgICAgYWRkRGVjbGFyYXRpb25Ub05nTW9kdWxlKG9wdGlvbnMpLFxuICAgICAgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKSxcbiAgICBdKSksXG4gIF0pO1xufVxuIl19