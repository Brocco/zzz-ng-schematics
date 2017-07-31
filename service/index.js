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
function addProviderToNgModule(options) {
    return (host) => {
        if (!options.module) {
            return host;
        }
        const modulePath = options.module;
        if (!host.exists(options.module)) {
            throw new Error(`Module specified (${options.module}) does not exist.`);
        }
        const sourceText = host.read(modulePath).toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const servicePath = `/${options.sourceDir}/${options.path}/`
            + (options.flat ? '' : stringUtils.dasherize(options.name) + '/')
            + stringUtils.dasherize(options.name)
            + '.service';
        const relativePath = find_module_1.buildRelativePath(modulePath, servicePath);
        const changes = ast_utils_1.addProviderToModule(source, modulePath, stringUtils.classify(`${options.name}Service`), relativePath);
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
        schematics_1.template(Object.assign({}, stringUtils, { 'if-flat': (s) => options.flat ? '' : s }, options)),
        schematics_1.move(options.sourceDir),
    ]);
    return schematics_1.chain([
        schematics_1.branchAndMerge(schematics_1.chain([
            schematics_1.filter(path => path.endsWith('.module.ts') && !path.endsWith('-routing.module.ts')),
            addProviderToNgModule(options),
            schematics_1.mergeWith(templateSource),
        ])),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3NlcnZpY2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCw4RUFBOEU7QUFDOUUsd0JBQXdCO0FBQ3hCLDJEQVlvQztBQUNwQyxtQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDLDBDQUEwQztBQUMxQyxvREFBMkQ7QUFDM0QsOENBQWlEO0FBQ2pELHdEQUEyRDtBQUUzRCwrQkFBK0IsT0FBWTtJQUN6QyxNQUFNLENBQUMsQ0FBQyxJQUFVO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLE9BQU8sQ0FBQyxNQUFNLG1CQUFtQixDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXpGLE1BQU0sV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsSUFBSSxHQUFHO2NBQ3RDLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2NBQy9ELFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztjQUNuQyxVQUFVLENBQUM7UUFDakMsTUFBTSxZQUFZLEdBQUcsK0JBQWlCLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sT0FBTyxHQUFHLCtCQUFtQixDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQ2xCLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUMsRUFDOUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsQ0FBQyxNQUFNLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sWUFBWSxxQkFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxtQkFBeUIsT0FBWTtJQUNuQyxNQUFNLGNBQWMsR0FBRyxrQkFBSyxDQUFDLGdCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDM0MsT0FBTyxDQUFDLElBQUksR0FBRyxpQkFBSSxFQUFFLEdBQUcsbUJBQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xFLHFCQUFRLG1CQUNILFdBQVcsSUFDZCxTQUFTLEVBQUUsQ0FBQyxDQUFTLEtBQUssT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUM1QyxPQUFPLEVBQ1Y7UUFDRixpQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLGtCQUFLLENBQUM7UUFDWCwyQkFBYyxDQUFDLGtCQUFLLENBQUM7WUFDbkIsbUJBQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNuRixxQkFBcUIsQ0FBQyxPQUFPLENBQUM7WUFDOUIsc0JBQVMsQ0FBQyxjQUFjLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWxCRCw0QkFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyBUT0RPOiByZXBsYWNlIGBvcHRpb25zOiBhbnlgIHdpdGggYW4gYWN0dWFsIHR5cGUgZ2VuZXJhdGVkIGZyb20gdGhlIHNjaGVtYS5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWFueVxuaW1wb3J0IHtcbiAgUnVsZSxcbiAgVHJlZSxcbiAgYXBwbHksXG4gIGJyYW5jaEFuZE1lcmdlLFxuICBjaGFpbixcbiAgZmlsdGVyLFxuICBtZXJnZVdpdGgsXG4gIG1vdmUsXG4gIG5vb3AsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWVyZ2UnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgKiBhcyBzdHJpbmdVdGlscyBmcm9tICcuLi9zdHJpbmdzJztcbmltcG9ydCB7IGFkZFByb3ZpZGVyVG9Nb2R1bGUgfSBmcm9tICcuLi91dGlsaXR5L2FzdC11dGlscyc7XG5pbXBvcnQgeyBJbnNlcnRDaGFuZ2UgfSBmcm9tICcuLi91dGlsaXR5L2NoYW5nZSc7XG5pbXBvcnQgeyBidWlsZFJlbGF0aXZlUGF0aCB9IGZyb20gJy4uL3V0aWxpdHkvZmluZC1tb2R1bGUnO1xuXG5mdW5jdGlvbiBhZGRQcm92aWRlclRvTmdNb2R1bGUob3B0aW9uczogYW55KTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGlmICghb3B0aW9ucy5tb2R1bGUpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGNvbnN0IG1vZHVsZVBhdGggPSBvcHRpb25zLm1vZHVsZTtcbiAgICBpZiAoIWhvc3QuZXhpc3RzKG9wdGlvbnMubW9kdWxlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNb2R1bGUgc3BlY2lmaWVkICgke29wdGlvbnMubW9kdWxlfSkgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlVGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKSAhLnRvU3RyaW5nKCd1dGYtOCcpO1xuICAgIGNvbnN0IHNvdXJjZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUobW9kdWxlUGF0aCwgc291cmNlVGV4dCwgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCwgdHJ1ZSk7XG5cbiAgICBjb25zdCBzZXJ2aWNlUGF0aCA9IGAvJHtvcHRpb25zLnNvdXJjZURpcn0vJHtvcHRpb25zLnBhdGh9L2BcbiAgICAgICAgICAgICAgICAgICAgICAgICsgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpXG4gICAgICAgICAgICAgICAgICAgICAgICArIHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICArICcuc2VydmljZSc7XG4gICAgY29uc3QgcmVsYXRpdmVQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgobW9kdWxlUGF0aCwgc2VydmljZVBhdGgpO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBhZGRQcm92aWRlclRvTW9kdWxlKHNvdXJjZSwgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdVdGlscy5jbGFzc2lmeShgJHtvcHRpb25zLm5hbWV9U2VydmljZWApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aCk7XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnM6IGFueSk6IFJ1bGUge1xuICBjb25zdCB0ZW1wbGF0ZVNvdXJjZSA9IGFwcGx5KHVybCgnLi9maWxlcycpLCBbXG4gICAgb3B0aW9ucy5zcGVjID8gbm9vcCgpIDogZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5zcGVjLnRzJykpLFxuICAgIHRlbXBsYXRlKHtcbiAgICAgIC4uLnN0cmluZ1V0aWxzLFxuICAgICAgJ2lmLWZsYXQnOiAoczogc3RyaW5nKSA9PiBvcHRpb25zLmZsYXQgPyAnJyA6IHMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH0pLFxuICAgIG1vdmUob3B0aW9ucy5zb3VyY2VEaXIpLFxuICBdKTtcblxuICByZXR1cm4gY2hhaW4oW1xuICAgIGJyYW5jaEFuZE1lcmdlKGNoYWluKFtcbiAgICAgIGZpbHRlcihwYXRoID0+IHBhdGguZW5kc1dpdGgoJy5tb2R1bGUudHMnKSAmJiAhcGF0aC5lbmRzV2l0aCgnLXJvdXRpbmcubW9kdWxlLnRzJykpLFxuICAgICAgYWRkUHJvdmlkZXJUb05nTW9kdWxlKG9wdGlvbnMpLFxuICAgICAgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKSxcbiAgICBdKSksXG4gIF0pO1xufVxuIl19