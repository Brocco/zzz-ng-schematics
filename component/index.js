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
        let sourceText = host.read(modulePath).toString('utf-8');
        let source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const componentPath = `/${options.sourceDir}/${options.path}/`
            + (options.flat ? '' : stringUtils.dasherize(options.name) + '/')
            + stringUtils.dasherize(options.name)
            + '.component';
        const relativePath = find_module_1.buildRelativePath(modulePath, componentPath);
        const classifiedName = stringUtils.classify(`${options.name}Component`);
        const declarationChanges = ast_utils_1.addDeclarationToModule(source, modulePath, classifiedName, relativePath);
        const declarationRecorder = host.beginUpdate(modulePath);
        for (const change of declarationChanges) {
            if (change instanceof change_1.InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(declarationRecorder);
        if (options.export) {
            sourceText = host.read(modulePath).toString('utf-8');
            source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
            const exportRecorder = host.beginUpdate(modulePath);
            const exportChanges = ast_utils_1.addExportToModule(source, modulePath, stringUtils.classify(`${options.name}Component`), relativePath);
            for (const change of exportChanges) {
                if (change instanceof change_1.InsertChange) {
                    exportRecorder.insertLeft(change.pos, change.toAdd);
                }
            }
            host.commitUpdate(exportRecorder);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2NvbXBvbmVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILDhFQUE4RTtBQUM5RSx3QkFBd0I7QUFDeEIsMkRBWW9DO0FBQ3BDLG1DQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsMENBQTBDO0FBQzFDLG9EQUFpRjtBQUNqRiw4Q0FBaUQ7QUFDakQsd0RBQXVFO0FBR3ZFLGtDQUFrQyxPQUFZO0lBQzVDLE1BQU0sQ0FBQyxDQUFDLElBQVU7UUFDaEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLFVBQVUsQ0FBQztRQUNmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixPQUFPLENBQUMsTUFBTSxtQkFBbUIsQ0FBQyxDQUFDO1lBQzFFLENBQUM7WUFDRCxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3pELFdBQVcsSUFBSSxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0UsVUFBVSxHQUFHLHdCQUFVLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV2RixNQUFNLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLElBQUksR0FBRztjQUN0QyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztjQUMvRCxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Y0FDbkMsWUFBWSxDQUFDO1FBQ3JDLE1BQU0sWUFBWSxHQUFHLCtCQUFpQixDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNsRSxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUM7UUFDeEUsTUFBTSxrQkFBa0IsR0FBRyxrQ0FBc0IsQ0FBQyxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxZQUFZLENBQUMsQ0FBQztRQUVoRSxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsR0FBRyxDQUFDLENBQUMsTUFBTSxNQUFNLElBQUksa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sWUFBWSxxQkFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNELENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RCxNQUFNLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbkYsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRCxNQUFNLGFBQWEsR0FBRyw2QkFBaUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUNsQixXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLEVBQ2hELFlBQVksQ0FBQyxDQUFDO1lBRXRELEdBQUcsQ0FBQyxDQUFDLE1BQU0sTUFBTSxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sWUFBWSxxQkFBWSxDQUFDLENBQUMsQ0FBQztvQkFDbkMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEQsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFHRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUdELHVCQUF1QixPQUFZO0lBQ2pDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25CLFFBQVEsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksUUFBUSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUdELG1CQUF3QixPQUFZO0lBQ2xDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUQsTUFBTSxjQUFjLEdBQUcsa0JBQUssQ0FBQyxnQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzNDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsaUJBQUksRUFBRSxHQUFHLG1CQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRSxPQUFPLENBQUMsV0FBVyxHQUFHLG1CQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLGlCQUFJLEVBQUU7UUFDOUUsT0FBTyxDQUFDLGNBQWMsR0FBRyxtQkFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxpQkFBSSxFQUFFO1FBQ3pFLHFCQUFRLG1CQUNILFdBQVcsSUFDZCxTQUFTLEVBQUUsQ0FBQyxDQUFTLEtBQUssT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUM1QyxPQUFPLEVBQ1Y7UUFDRixpQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLGtCQUFLLENBQUM7UUFDWCwyQkFBYyxDQUFDLGtCQUFLLENBQUM7WUFDbkIsbUJBQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNuRix3QkFBd0IsQ0FBQyxPQUFPLENBQUM7WUFDakMsc0JBQVMsQ0FBQyxjQUFjLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXRCRCw0QkFzQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyBUT0RPOiByZXBsYWNlIGBvcHRpb25zOiBhbnlgIHdpdGggYW4gYWN0dWFsIHR5cGUgZ2VuZXJhdGVkIGZyb20gdGhlIHNjaGVtYS5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWFueVxuaW1wb3J0IHtcbiAgUnVsZSxcbiAgVHJlZSxcbiAgYXBwbHksXG4gIGJyYW5jaEFuZE1lcmdlLFxuICBjaGFpbixcbiAgZmlsdGVyLFxuICBtZXJnZVdpdGgsXG4gIG1vdmUsXG4gIG5vb3AsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWVyZ2UnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgKiBhcyBzdHJpbmdVdGlscyBmcm9tICcuLi9zdHJpbmdzJztcbmltcG9ydCB7IGFkZERlY2xhcmF0aW9uVG9Nb2R1bGUsIGFkZEV4cG9ydFRvTW9kdWxlIH0gZnJvbSAnLi4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuaW1wb3J0IHsgSW5zZXJ0Q2hhbmdlIH0gZnJvbSAnLi4vdXRpbGl0eS9jaGFuZ2UnO1xuaW1wb3J0IHsgYnVpbGRSZWxhdGl2ZVBhdGgsIGZpbmRNb2R1bGUgfSBmcm9tICcuLi91dGlsaXR5L2ZpbmQtbW9kdWxlJztcblxuXG5mdW5jdGlvbiBhZGREZWNsYXJhdGlvblRvTmdNb2R1bGUob3B0aW9uczogYW55KTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGlmIChvcHRpb25zLnNraXBJbXBvcnQpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGxldCBtb2R1bGVQYXRoO1xuICAgIGlmIChvcHRpb25zLm1vZHVsZSkge1xuICAgICAgaWYgKCFob3N0LmV4aXN0cyhvcHRpb25zLm1vZHVsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNb2R1bGUgc3BlY2lmaWVkICgke29wdGlvbnMubW9kdWxlfSkgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICB9XG4gICAgICBtb2R1bGVQYXRoID0gb3B0aW9ucy5tb2R1bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBwYXRoVG9DaGVjayA9IG9wdGlvbnMuc291cmNlRGlyICsgJy8nICsgb3B0aW9ucy5wYXRoO1xuICAgICAgcGF0aFRvQ2hlY2sgKz0gb3B0aW9ucy5mbGF0ID8gJycgOiAnLycgKyBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKTtcbiAgICAgIG1vZHVsZVBhdGggPSBmaW5kTW9kdWxlKGhvc3QsIHBhdGhUb0NoZWNrKTtcbiAgICB9XG5cbiAgICBsZXQgc291cmNlVGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKSAhLnRvU3RyaW5nKCd1dGYtOCcpO1xuICAgIGxldCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKG1vZHVsZVBhdGgsIHNvdXJjZVRleHQsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsIHRydWUpO1xuXG4gICAgY29uc3QgY29tcG9uZW50UGF0aCA9IGAvJHtvcHRpb25zLnNvdXJjZURpcn0vJHtvcHRpb25zLnBhdGh9L2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyAob3B0aW9ucy5mbGF0ID8gJycgOiBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArICcvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBzdHJpbmdVdGlscy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICArICcuY29tcG9uZW50JztcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChtb2R1bGVQYXRoLCBjb21wb25lbnRQYXRoKTtcbiAgICBjb25zdCBjbGFzc2lmaWVkTmFtZSA9IHN0cmluZ1V0aWxzLmNsYXNzaWZ5KGAke29wdGlvbnMubmFtZX1Db21wb25lbnRgKTtcbiAgICBjb25zdCBkZWNsYXJhdGlvbkNoYW5nZXMgPSBhZGREZWNsYXJhdGlvblRvTW9kdWxlKHNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aCk7XG5cbiAgICBjb25zdCBkZWNsYXJhdGlvblJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShtb2R1bGVQYXRoKTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBkZWNsYXJhdGlvbkNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgZGVjbGFyYXRpb25SZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKGRlY2xhcmF0aW9uUmVjb3JkZXIpO1xuXG4gICAgaWYgKG9wdGlvbnMuZXhwb3J0KSB7XG4gICAgICBzb3VyY2VUZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpICEudG9TdHJpbmcoJ3V0Zi04Jyk7XG4gICAgICBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKG1vZHVsZVBhdGgsIHNvdXJjZVRleHQsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsIHRydWUpO1xuXG4gICAgICBjb25zdCBleHBvcnRSZWNvcmRlciA9IGhvc3QuYmVnaW5VcGRhdGUobW9kdWxlUGF0aCk7XG4gICAgICBjb25zdCBleHBvcnRDaGFuZ2VzID0gYWRkRXhwb3J0VG9Nb2R1bGUoc291cmNlLCBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ1V0aWxzLmNsYXNzaWZ5KGAke29wdGlvbnMubmFtZX1Db21wb25lbnRgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBleHBvcnRDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgICBleHBvcnRSZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGhvc3QuY29tbWl0VXBkYXRlKGV4cG9ydFJlY29yZGVyKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkU2VsZWN0b3Iob3B0aW9uczogYW55KSB7XG4gIGxldCBzZWxlY3RvciA9IHN0cmluZ1V0aWxzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpO1xuICBpZiAob3B0aW9ucy5wcmVmaXgpIHtcbiAgICBzZWxlY3RvciA9IGAke29wdGlvbnMucHJlZml4fS0ke3NlbGVjdG9yfWA7XG4gIH1cblxuICByZXR1cm4gc2VsZWN0b3I7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uczogYW55KTogUnVsZSB7XG4gIG9wdGlvbnMuc2VsZWN0b3IgPSBvcHRpb25zLnNlbGVjdG9yIHx8IGJ1aWxkU2VsZWN0b3Iob3B0aW9ucyk7XG5cbiAgY29uc3QgdGVtcGxhdGVTb3VyY2UgPSBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgIG9wdGlvbnMuc3BlYyA/IG5vb3AoKSA6IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuc3BlYy50cycpKSxcbiAgICBvcHRpb25zLmlubGluZVN0eWxlID8gZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5fX3N0eWxlZXh0X18nKSkgOiBub29wKCksXG4gICAgb3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuaHRtbCcpKSA6IG5vb3AoKSxcbiAgICB0ZW1wbGF0ZSh7XG4gICAgICAuLi5zdHJpbmdVdGlscyxcbiAgICAgICdpZi1mbGF0JzogKHM6IHN0cmluZykgPT4gb3B0aW9ucy5mbGF0ID8gJycgOiBzLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9KSxcbiAgICBtb3ZlKG9wdGlvbnMuc291cmNlRGlyKSxcbiAgXSk7XG5cbiAgcmV0dXJuIGNoYWluKFtcbiAgICBicmFuY2hBbmRNZXJnZShjaGFpbihbXG4gICAgICBmaWx0ZXIocGF0aCA9PiBwYXRoLmVuZHNXaXRoKCcubW9kdWxlLnRzJykgJiYgIXBhdGguZW5kc1dpdGgoJy1yb3V0aW5nLm1vZHVsZS50cycpKSxcbiAgICAgIGFkZERlY2xhcmF0aW9uVG9OZ01vZHVsZShvcHRpb25zKSxcbiAgICAgIG1lcmdlV2l0aCh0ZW1wbGF0ZVNvdXJjZSksXG4gICAgXSkpLFxuICBdKTtcbn1cbiJdfQ==