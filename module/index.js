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
        const importModulePath = `/${options.sourceDir}/${options.path}/`
            + (options.flat ? '' : stringUtils.dasherize(options.name) + '/')
            + stringUtils.dasherize(options.name)
            + '.module';
        const relativePath = find_module_1.buildRelativePath(modulePath, importModulePath);
        const changes = ast_utils_1.addImportToModule(source, modulePath, stringUtils.classify(`${options.name}Module`), relativePath);
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
    const templateSource = schematics_1.apply(schematics_1.url('./files'), [
        options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith('.spec.ts')),
        options.routing ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith('-routing.module.ts')),
        schematics_1.template(Object.assign({}, stringUtils, { 'if-flat': (s) => options.flat ? '' : s }, options)),
        schematics_1.move(options.sourceDir),
    ]);
    return schematics_1.chain([
        schematics_1.branchAndMerge(schematics_1.chain([
            addDeclarationToNgModule(options),
            schematics_1.mergeWith(templateSource),
        ])),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL21vZHVsZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7RUFNRTtBQUNGLDhFQUE4RTtBQUM5RSx3QkFBd0I7QUFDeEIsMkRBWW9DO0FBQ3BDLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsb0RBQXlEO0FBQ3pELDhDQUFpRDtBQUNqRCx3REFBMkQ7QUFHM0Qsa0NBQWtDLE9BQVk7SUFDNUMsTUFBTSxDQUFDLENBQUMsSUFBVTtRQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRWxDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXpGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUc7Y0FDOUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Y0FDL0QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2NBQ25DLFNBQVMsQ0FBQztRQUM3QixNQUFNLFlBQVksR0FBRywrQkFBaUIsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRSxNQUFNLE9BQU8sR0FBRyw2QkFBaUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUNsQixXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksUUFBUSxDQUFDLEVBQzdDLFlBQVksQ0FBQyxDQUFDO1FBRWhELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLENBQUMsTUFBTSxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVkscUJBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsbUJBQXlCLE9BQVk7SUFDbkMsTUFBTSxjQUFjLEdBQUcsa0JBQUssQ0FBQyxnQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzNDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsaUJBQUksRUFBRSxHQUFHLG1CQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRSxPQUFPLENBQUMsT0FBTyxHQUFHLGlCQUFJLEVBQUUsR0FBRyxtQkFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvRSxxQkFBUSxtQkFDSCxXQUFXLElBQ2QsU0FBUyxFQUFFLENBQUMsQ0FBUyxLQUFLLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFDNUMsT0FBTyxFQUNWO1FBQ0YsaUJBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0tBQ3hCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxrQkFBSyxDQUFDO1FBQ1gsMkJBQWMsQ0FBQyxrQkFBSyxDQUFDO1lBQ25CLHdCQUF3QixDQUFDLE9BQU8sQ0FBQztZQUNqQyxzQkFBUyxDQUFDLGNBQWMsQ0FBQztTQUMxQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7QUFDTCxDQUFDO0FBbEJELDRCQWtCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBAbGljZW5zZVxuKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbipcbiogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuKi9cbi8vIFRPRE86IHJlcGxhY2UgYG9wdGlvbnM6IGFueWAgd2l0aCBhbiBhY3R1YWwgdHlwZSBnZW5lcmF0ZWQgZnJvbSB0aGUgc2NoZW1hLlxuLy8gdHNsaW50OmRpc2FibGU6bm8tYW55XG5pbXBvcnQge1xuICBSdWxlLFxuICBUcmVlLFxuICBhcHBseSxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBmaWx0ZXIsXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgbm9vcCxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgKiBhcyBzdHJpbmdVdGlscyBmcm9tICcuLi9zdHJpbmdzJztcbmltcG9ydCB7IGFkZEltcG9ydFRvTW9kdWxlIH0gZnJvbSAnLi4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuaW1wb3J0IHsgSW5zZXJ0Q2hhbmdlIH0gZnJvbSAnLi4vdXRpbGl0eS9jaGFuZ2UnO1xuaW1wb3J0IHsgYnVpbGRSZWxhdGl2ZVBhdGggfSBmcm9tICcuLi91dGlsaXR5L2ZpbmQtbW9kdWxlJztcblxuXG5mdW5jdGlvbiBhZGREZWNsYXJhdGlvblRvTmdNb2R1bGUob3B0aW9uczogYW55KTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGlmICghb3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGlmICghaG9zdC5leGlzdHMob3B0aW9ucy5tb2R1bGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZmllZCBtb2R1bGUgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG9wdGlvbnMubW9kdWxlO1xuXG4gICAgY29uc3Qgc291cmNlVGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKSAhLnRvU3RyaW5nKCd1dGYtOCcpO1xuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUobW9kdWxlUGF0aCwgc291cmNlVGV4dCwgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCwgdHJ1ZSk7XG5cbiAgICBjb25zdCBpbXBvcnRNb2R1bGVQYXRoID0gYC8ke29wdGlvbnMuc291cmNlRGlyfS8ke29wdGlvbnMucGF0aH0vYFxuICAgICAgICAgICAgICAgICAgICAgKyAob3B0aW9ucy5mbGF0ID8gJycgOiBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArICcvJylcbiAgICAgICAgICAgICAgICAgICAgICsgc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICsgJy5tb2R1bGUnO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKG1vZHVsZVBhdGgsIGltcG9ydE1vZHVsZVBhdGgpO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBhZGRJbXBvcnRUb01vZHVsZShzb3VyY2UsIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ1V0aWxzLmNsYXNzaWZ5KGAke29wdGlvbnMubmFtZX1Nb2R1bGVgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoKTtcblxuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShtb2R1bGVQYXRoKTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb25zOiBhbnkpOiBSdWxlIHtcbiAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgIG9wdGlvbnMuc3BlYyA/IG5vb3AoKSA6IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuc3BlYy50cycpKSxcbiAgICBvcHRpb25zLnJvdXRpbmcgPyBub29wKCkgOiBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLXJvdXRpbmcubW9kdWxlLnRzJykpLFxuICAgIHRlbXBsYXRlKHtcbiAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PiBvcHRpb25zLmZsYXQgPyAnJyA6IHMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH0pLFxuICAgIG1vdmUob3B0aW9ucy5zb3VyY2VEaXIpLFxuICBdKTtcblxuICByZXR1cm4gY2hhaW4oW1xuICAgIGJyYW5jaEFuZE1lcmdlKGNoYWluKFtcbiAgICAgIGFkZERlY2xhcmF0aW9uVG9OZ01vZHVsZShvcHRpb25zKSxcbiAgICAgIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSksXG4gICAgXSkpLFxuICBdKTtcbn1cbiJdfQ==