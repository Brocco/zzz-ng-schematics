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
require("rxjs/add/operator/merge");
const ts = require("typescript");
const stringUtils = require("../strings");
const ast_utils_1 = require("../utility/ast-utils");
const change_1 = require("../utility/change");
const find_module_1 = require("../utility/find-module");
function addDeclarationToNgModule(options) {
    return (host) => {
        if (!options.module) {
            return host;
        }
        if (!host.exists(options.module)) {
            throw new Error('Specified module does not exist');
        }
        const modulePath = options.module;
        const sourceText = host.read(modulePath).toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const guardPath = `/${options.sourceDir}/${options.path}/`
            + (options.flat ? '' : stringUtils.dasherize(options.name) + '/')
            + stringUtils.dasherize(options.name)
            + '.guard';
        const relativePath = find_module_1.buildRelativePath(modulePath, guardPath);
        const changes = ast_utils_1.addProviderToModule(source, modulePath, stringUtils.classify(`${options.name}Guard`), relativePath);
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
function default_1(options) {
    options.path = options.path ? schematics_1.normalizePath(options.path) : options.path;
    return (host, context) => {
        options.module = find_module_1.findModuleFromOptions(host, options);
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith('.spec.ts')),
            schematics_1.template(Object.assign({}, stringUtils, options)),
            schematics_1.move(options.sourceDir),
        ]);
        return schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([
                addDeclarationToNgModule(options),
                schematics_1.mergeWith(templateSource),
            ])),
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2d1YXJkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztFQU1FO0FBQ0YsMkRBY29DO0FBQ3BDLG1DQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsMENBQTBDO0FBQzFDLG9EQUEyRDtBQUMzRCw4Q0FBaUQ7QUFDakQsd0RBQWtGO0FBSWxGLGtDQUFrQyxPQUFxQjtJQUNyRCxNQUFNLENBQUMsQ0FBQyxJQUFVO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUNELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFekYsTUFBTSxTQUFTLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUc7Y0FDbEMsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Y0FDL0QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2NBQ25DLFFBQVEsQ0FBQztRQUNqQyxNQUFNLFlBQVksR0FBRywrQkFBaUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUQsTUFBTSxPQUFPLEdBQUcsK0JBQW1CLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFDbEIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxFQUM1QyxZQUFZLENBQUMsQ0FBQztRQUNsRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLHFCQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELG1CQUF5QixPQUFxQjtJQUM1QyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsMEJBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUV6RSxNQUFNLENBQUMsQ0FBQyxJQUFVLEVBQUUsT0FBeUI7UUFDM0MsT0FBTyxDQUFDLE1BQU0sR0FBRyxtQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFdEQsTUFBTSxjQUFjLEdBQUcsa0JBQUssQ0FBQyxnQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsaUJBQUksRUFBRSxHQUFHLG1CQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRSxxQkFBUSxtQkFDSCxXQUFXLEVBQ1gsT0FBaUIsRUFDcEI7WUFDRixpQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFXLENBQUM7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLGtCQUFLLENBQUM7WUFDWCwyQkFBYyxDQUFDLGtCQUFLLENBQUM7Z0JBQ25CLHdCQUF3QixDQUFDLE9BQU8sQ0FBQztnQkFDakMsc0JBQVMsQ0FBQyxjQUFjLENBQUM7YUFDMUIsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUM7QUFDSixDQUFDO0FBdEJELDRCQXNCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBAbGljZW5zZVxuKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbipcbiogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuKi9cbmltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICBub3JtYWxpemVQYXRoLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21lcmdlJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0ICogYXMgc3RyaW5nVXRpbHMgZnJvbSAnLi4vc3RyaW5ncyc7XG5pbXBvcnQgeyBhZGRQcm92aWRlclRvTW9kdWxlIH0gZnJvbSAnLi4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuaW1wb3J0IHsgSW5zZXJ0Q2hhbmdlIH0gZnJvbSAnLi4vdXRpbGl0eS9jaGFuZ2UnO1xuaW1wb3J0IHsgYnVpbGRSZWxhdGl2ZVBhdGgsIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyB9IGZyb20gJy4uL3V0aWxpdHkvZmluZC1tb2R1bGUnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIEd1YXJkT3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuXG5mdW5jdGlvbiBhZGREZWNsYXJhdGlvblRvTmdNb2R1bGUob3B0aW9uczogR3VhcmRPcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGlmICghb3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGlmICghaG9zdC5leGlzdHMob3B0aW9ucy5tb2R1bGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZmllZCBtb2R1bGUgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG9wdGlvbnMubW9kdWxlO1xuXG4gICAgY29uc3Qgc291cmNlVGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKSAhLnRvU3RyaW5nKCd1dGYtOCcpO1xuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUobW9kdWxlUGF0aCwgc291cmNlVGV4dCwgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCwgdHJ1ZSk7XG5cbiAgICBjb25zdCBndWFyZFBhdGggPSBgLyR7b3B0aW9ucy5zb3VyY2VEaXJ9LyR7b3B0aW9ucy5wYXRofS9gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnLmd1YXJkJztcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChtb2R1bGVQYXRoLCBndWFyZFBhdGgpO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBhZGRQcm92aWRlclRvTW9kdWxlKHNvdXJjZSwgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdVdGlscy5jbGFzc2lmeShgJHtvcHRpb25zLm5hbWV9R3VhcmRgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGgpO1xuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShtb2R1bGVQYXRoKTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb25zOiBHdWFyZE9wdGlvbnMpOiBSdWxlIHtcbiAgb3B0aW9ucy5wYXRoID0gb3B0aW9ucy5wYXRoID8gbm9ybWFsaXplUGF0aChvcHRpb25zLnBhdGgpIDogb3B0aW9ucy5wYXRoO1xuXG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIG9wdGlvbnMubW9kdWxlID0gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3QsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgICAgb3B0aW9ucy5zcGVjID8gbm9vcCgpIDogZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5zcGVjLnRzJykpLFxuICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgICAgLi4ub3B0aW9ucyBhcyBvYmplY3QsXG4gICAgICB9KSxcbiAgICAgIG1vdmUob3B0aW9ucy5zb3VyY2VEaXIgISksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgYnJhbmNoQW5kTWVyZ2UoY2hhaW4oW1xuICAgICAgICBhZGREZWNsYXJhdGlvblRvTmdNb2R1bGUob3B0aW9ucyksXG4gICAgICAgIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSksXG4gICAgICBdKSksXG4gICAgXSkoaG9zdCwgY29udGV4dCk7XG4gIH07XG59XG4iXX0=