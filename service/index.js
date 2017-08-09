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
            throw new Error('Specified module does not exist');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3NlcnZpY2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCw4RUFBOEU7QUFDOUUsd0JBQXdCO0FBQ3hCLDJEQVlvQztBQUNwQyxtQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDLDBDQUEwQztBQUMxQyxvREFBMkQ7QUFDM0QsOENBQWlEO0FBQ2pELHdEQUEyRDtBQUUzRCwrQkFBK0IsT0FBWTtJQUN6QyxNQUFNLENBQUMsQ0FBQyxJQUFVO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFekYsTUFBTSxXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUc7Y0FDdEMsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Y0FDL0QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2NBQ25DLFVBQVUsQ0FBQztRQUNqQyxNQUFNLFlBQVksR0FBRywrQkFBaUIsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDaEUsTUFBTSxPQUFPLEdBQUcsK0JBQW1CLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFDbEIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxFQUM5QyxZQUFZLENBQUMsQ0FBQztRQUNsRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLHFCQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELG1CQUF5QixPQUFZO0lBQ25DLE1BQU0sY0FBYyxHQUFHLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMzQyxPQUFPLENBQUMsSUFBSSxHQUFHLGlCQUFJLEVBQUUsR0FBRyxtQkFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEUscUJBQVEsbUJBQ0gsV0FBVyxJQUNkLFNBQVMsRUFBRSxDQUFDLENBQVMsS0FBSyxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQzVDLE9BQU8sRUFDVjtRQUNGLGlCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztLQUN4QixDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsa0JBQUssQ0FBQztRQUNYLDJCQUFjLENBQUMsa0JBQUssQ0FBQztZQUNuQixtQkFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ25GLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztZQUM5QixzQkFBUyxDQUFDLGNBQWMsQ0FBQztTQUMxQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7QUFDTCxDQUFDO0FBbEJELDRCQWtCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIFRPRE86IHJlcGxhY2UgYG9wdGlvbnM6IGFueWAgd2l0aCBhbiBhY3R1YWwgdHlwZSBnZW5lcmF0ZWQgZnJvbSB0aGUgc2NoZW1hLlxuLy8gdHNsaW50OmRpc2FibGU6bm8tYW55XG5pbXBvcnQge1xuICBSdWxlLFxuICBUcmVlLFxuICBhcHBseSxcbiAgYnJhbmNoQW5kTWVyZ2UsXG4gIGNoYWluLFxuICBmaWx0ZXIsXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgbm9vcCxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tZXJnZSc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCAqIGFzIHN0cmluZ1V0aWxzIGZyb20gJy4uL3N0cmluZ3MnO1xuaW1wb3J0IHsgYWRkUHJvdmlkZXJUb01vZHVsZSB9IGZyb20gJy4uL3V0aWxpdHkvYXN0LXV0aWxzJztcbmltcG9ydCB7IEluc2VydENoYW5nZSB9IGZyb20gJy4uL3V0aWxpdHkvY2hhbmdlJztcbmltcG9ydCB7IGJ1aWxkUmVsYXRpdmVQYXRoIH0gZnJvbSAnLi4vdXRpbGl0eS9maW5kLW1vZHVsZSc7XG5cbmZ1bmN0aW9uIGFkZFByb3ZpZGVyVG9OZ01vZHVsZShvcHRpb25zOiBhbnkpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgaWYgKCFvcHRpb25zLm1vZHVsZSkge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG9wdGlvbnMubW9kdWxlO1xuICAgIGlmICghaG9zdC5leGlzdHMob3B0aW9ucy5tb2R1bGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZmllZCBtb2R1bGUgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpICEudG9TdHJpbmcoJ3V0Zi04Jyk7XG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShtb2R1bGVQYXRoLCBzb3VyY2VUZXh0LCB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LCB0cnVlKTtcblxuICAgIGNvbnN0IHNlcnZpY2VQYXRoID0gYC8ke29wdGlvbnMuc291cmNlRGlyfS8ke29wdGlvbnMucGF0aH0vYFxuICAgICAgICAgICAgICAgICAgICAgICAgKyAob3B0aW9ucy5mbGF0ID8gJycgOiBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArICcvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICsgc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJy5zZXJ2aWNlJztcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChtb2R1bGVQYXRoLCBzZXJ2aWNlUGF0aCk7XG4gICAgY29uc3QgY2hhbmdlcyA9IGFkZFByb3ZpZGVyVG9Nb2R1bGUoc291cmNlLCBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ1V0aWxzLmNsYXNzaWZ5KGAke29wdGlvbnMubmFtZX1TZXJ2aWNlYCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoKTtcbiAgICBjb25zdCByZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9uczogYW55KTogUnVsZSB7XG4gIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICBvcHRpb25zLnNwZWMgPyBub29wKCkgOiBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMnKSksXG4gICAgdGVtcGxhdGUoe1xuICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+IG9wdGlvbnMuZmxhdCA/ICcnIDogcyxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfSksXG4gICAgbW92ZShvcHRpb25zLnNvdXJjZURpciksXG4gIF0pO1xuXG4gIHJldHVybiBjaGFpbihbXG4gICAgYnJhbmNoQW5kTWVyZ2UoY2hhaW4oW1xuICAgICAgZmlsdGVyKHBhdGggPT4gcGF0aC5lbmRzV2l0aCgnLm1vZHVsZS50cycpICYmICFwYXRoLmVuZHNXaXRoKCctcm91dGluZy5tb2R1bGUudHMnKSksXG4gICAgICBhZGRQcm92aWRlclRvTmdNb2R1bGUob3B0aW9ucyksXG4gICAgICBtZXJnZVdpdGgodGVtcGxhdGVTb3VyY2UpLFxuICAgIF0pKSxcbiAgXSk7XG59XG4iXX0=