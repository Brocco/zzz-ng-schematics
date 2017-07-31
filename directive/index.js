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
            modulePath = find_module_1.findModule(host, options.sourceDir + '/' + options.path);
        }
        const sourceText = host.read(modulePath).toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const componentPath = `/${options.sourceDir}/${options.path}/`
            + (options.flat ? '' : stringUtils.dasherize(options.name) + '/')
            + stringUtils.dasherize(options.name)
            + '.component';
        const relativePath = find_module_1.buildRelativePath(modulePath, componentPath);
        const changes = ast_utils_1.addDeclarationToModule(source, modulePath, stringUtils.classify(`${options.name}Component`), relativePath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL2RpcmVjdGl2ZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7RUFNRTtBQUNGLDhFQUE4RTtBQUM5RSx3QkFBd0I7QUFDeEIsMkRBWW9DO0FBQ3BDLG1DQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsMENBQTBDO0FBQzFDLG9EQUE4RDtBQUM5RCw4Q0FBaUQ7QUFDakQsd0RBQXVFO0FBR3ZFLGtDQUFrQyxPQUFZO0lBQzVDLE1BQU0sQ0FBQyxDQUFDLElBQVU7UUFDaEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLFVBQVUsQ0FBQztRQUNmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixPQUFPLENBQUMsTUFBTSxtQkFBbUIsQ0FBQyxDQUFDO1lBQzFFLENBQUM7WUFDRCxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixVQUFVLEdBQUcsd0JBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hFLENBQUM7UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV6RixNQUFNLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLElBQUksR0FBRztjQUN0QyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztjQUMvRCxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Y0FDbkMsWUFBWSxDQUFDO1FBQ3JDLE1BQU0sWUFBWSxHQUFHLCtCQUFpQixDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNsRSxNQUFNLE9BQU8sR0FBRyxrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUNsQixXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLEVBQ2hELFlBQVksQ0FBQyxDQUFDO1FBQ3JELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLENBQUMsTUFBTSxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVkscUJBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7QUFDSixDQUFDO0FBR0QsdUJBQXVCLE9BQVk7SUFDakMsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkIsUUFBUSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRUQsbUJBQXlCLE9BQVk7SUFDbkMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5RCxNQUFNLGNBQWMsR0FBRyxrQkFBSyxDQUFDLGdCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDM0MsT0FBTyxDQUFDLElBQUksR0FBRyxpQkFBSSxFQUFFLEdBQUcsbUJBQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xFLHFCQUFRLG1CQUNILFdBQVcsSUFDZCxTQUFTLEVBQUUsQ0FBQyxDQUFTLEtBQUssT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUM1QyxPQUFPLEVBQ1Y7UUFDRixpQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLGtCQUFLLENBQUM7UUFDWCwyQkFBYyxDQUFDLGtCQUFLLENBQUM7WUFDbkIsd0JBQXdCLENBQUMsT0FBTyxDQUFDO1lBQ2pDLHNCQUFTLENBQUMsY0FBYyxDQUFDO1NBQzFCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuQkQsNEJBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIEBsaWNlbnNlXG4qIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuKlxuKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4qL1xuLy8gVE9ETzogcmVwbGFjZSBgb3B0aW9uczogYW55YCB3aXRoIGFuIGFjdHVhbCB0eXBlIGdlbmVyYXRlZCBmcm9tIHRoZSBzY2hlbWEuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1hbnlcbmltcG9ydCB7XG4gIFJ1bGUsXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBicmFuY2hBbmRNZXJnZSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICB0ZW1wbGF0ZSxcbiAgdXJsLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21lcmdlJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0ICogYXMgc3RyaW5nVXRpbHMgZnJvbSAnLi4vc3RyaW5ncyc7XG5pbXBvcnQgeyBhZGREZWNsYXJhdGlvblRvTW9kdWxlIH0gZnJvbSAnLi4vdXRpbGl0eS9hc3QtdXRpbHMnO1xuaW1wb3J0IHsgSW5zZXJ0Q2hhbmdlIH0gZnJvbSAnLi4vdXRpbGl0eS9jaGFuZ2UnO1xuaW1wb3J0IHsgYnVpbGRSZWxhdGl2ZVBhdGgsIGZpbmRNb2R1bGUgfSBmcm9tICcuLi91dGlsaXR5L2ZpbmQtbW9kdWxlJztcblxuXG5mdW5jdGlvbiBhZGREZWNsYXJhdGlvblRvTmdNb2R1bGUob3B0aW9uczogYW55KTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGlmIChvcHRpb25zLnNraXBJbXBvcnQpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGxldCBtb2R1bGVQYXRoO1xuICAgIGlmIChvcHRpb25zLm1vZHVsZSkge1xuICAgICAgaWYgKCFob3N0LmV4aXN0cyhvcHRpb25zLm1vZHVsZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNb2R1bGUgc3BlY2lmaWVkICgke29wdGlvbnMubW9kdWxlfSkgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICB9XG4gICAgICBtb2R1bGVQYXRoID0gb3B0aW9ucy5tb2R1bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZHVsZVBhdGggPSBmaW5kTW9kdWxlKGhvc3QsIG9wdGlvbnMuc291cmNlRGlyICsgJy8nICsgb3B0aW9ucy5wYXRoKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VUZXh0ID0gaG9zdC5yZWFkKG1vZHVsZVBhdGgpICEudG9TdHJpbmcoJ3V0Zi04Jyk7XG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShtb2R1bGVQYXRoLCBzb3VyY2VUZXh0LCB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LCB0cnVlKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudFBhdGggPSBgLyR7b3B0aW9ucy5zb3VyY2VEaXJ9LyR7b3B0aW9ucy5wYXRofS9gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnLmNvbXBvbmVudCc7XG4gICAgY29uc3QgcmVsYXRpdmVQYXRoID0gYnVpbGRSZWxhdGl2ZVBhdGgobW9kdWxlUGF0aCwgY29tcG9uZW50UGF0aCk7XG4gICAgY29uc3QgY2hhbmdlcyA9IGFkZERlY2xhcmF0aW9uVG9Nb2R1bGUoc291cmNlLCBtb2R1bGVQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ1V0aWxzLmNsYXNzaWZ5KGAke29wdGlvbnMubmFtZX1Db21wb25lbnRgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGgpO1xuICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShtb2R1bGVQYXRoKTtcbiAgICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0Q2hhbmdlKSB7XG4gICAgICAgIHJlY29yZGVyLmluc2VydExlZnQoY2hhbmdlLnBvcywgY2hhbmdlLnRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cblxuZnVuY3Rpb24gYnVpbGRTZWxlY3RvcihvcHRpb25zOiBhbnkpIHtcbiAgbGV0IHNlbGVjdG9yID0gc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSk7XG4gIGlmIChvcHRpb25zLnByZWZpeCkge1xuICAgIHNlbGVjdG9yID0gYCR7b3B0aW9ucy5wcmVmaXh9LSR7c2VsZWN0b3J9YDtcbiAgfVxuXG4gIHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnM6IGFueSk6IFJ1bGUge1xuICBvcHRpb25zLnNlbGVjdG9yID0gb3B0aW9ucy5zZWxlY3RvciB8fCBidWlsZFNlbGVjdG9yKG9wdGlvbnMpO1xuXG4gIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICBvcHRpb25zLnNwZWMgPyBub29wKCkgOiBmaWx0ZXIocGF0aCA9PiAhcGF0aC5lbmRzV2l0aCgnLnNwZWMudHMnKSksXG4gICAgdGVtcGxhdGUoe1xuICAgICAgLi4uc3RyaW5nVXRpbHMsXG4gICAgICAnaWYtZmxhdCc6IChzOiBzdHJpbmcpID0+IG9wdGlvbnMuZmxhdCA/ICcnIDogcyxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfSksXG4gICAgbW92ZShvcHRpb25zLnNvdXJjZURpciksXG4gIF0pO1xuXG4gIHJldHVybiBjaGFpbihbXG4gICAgYnJhbmNoQW5kTWVyZ2UoY2hhaW4oW1xuICAgICAgYWRkRGVjbGFyYXRpb25Ub05nTW9kdWxlKG9wdGlvbnMpLFxuICAgICAgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKSxcbiAgICBdKSksXG4gIF0pO1xufVxuIl19