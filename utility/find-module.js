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
const path = require("path");
/**
 * Function to find the "closest" module to a generated file's path.
 */
function findModule(host, generateDir) {
    let closestModule = generateDir.endsWith('/') ? generateDir : generateDir + '/';
    const allFiles = host.files;
    let modulePath = null;
    const moduleRe = /\.module\.ts$/;
    while (closestModule) {
        const normalizedRoot = schematics_1.normalizePath(closestModule);
        const matches = allFiles.filter(p => moduleRe.test(p) && p.startsWith(normalizedRoot));
        if (matches.length == 1) {
            modulePath = matches[0];
            break;
        }
        else if (matches.length > 1) {
            throw new Error('More than one module matches. Use skip-import option to skip importing '
                + 'the component into the closest module.');
        }
        closestModule = closestModule.split('/').slice(0, -1).join('/');
    }
    if (!modulePath) {
        throw new Error('Could not find an NgModule for the new component. Use the skip-import '
            + 'option to skip importing components in NgModule.');
    }
    return modulePath;
}
exports.findModule = findModule;
/**
 * Build a relative path from one file path to another file path.
 */
function buildRelativePath(from, to) {
    // Convert to arrays.
    const fromParts = from.split('/');
    const toParts = to.split('/');
    // Remove file names (preserving destination)
    fromParts.pop();
    const toFileName = toParts.pop();
    const relativePath = path.relative(fromParts.join('/'), toParts.join('/'));
    let pathPrefix = '';
    // Set the path prefix for same dir or child dir, parent dir starts with `..`
    if (!relativePath) {
        pathPrefix = '.';
    }
    else if (!relativePath.startsWith('.')) {
        pathPrefix = `./`;
    }
    return `${pathPrefix}${relativePath}/${toFileName}`;
}
exports.buildRelativePath = buildRelativePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvZmluZC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwyREFBaUU7QUFDakUsNkJBQTZCO0FBRTdCOztHQUVHO0FBQ0gsb0JBQTJCLElBQVUsRUFBRSxXQUFtQjtJQUN4RCxJQUFJLGFBQWEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsR0FBRyxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQ2hGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFFNUIsSUFBSSxVQUFVLEdBQWtCLElBQUksQ0FBQztJQUNyQyxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUM7SUFDakMsT0FBTyxhQUFhLEVBQUUsQ0FBQztRQUNyQixNQUFNLGNBQWMsR0FBRywwQkFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRXZGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssQ0FBQztRQUNSLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMseUVBQXlFO2tCQUNyRix3Q0FBd0MsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxhQUFhLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0U7Y0FDcEYsa0RBQWtELENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBMUJELGdDQTBCQztBQUVEOztHQUVHO0FBQ0gsMkJBQWtDLElBQVksRUFBRSxFQUFVO0lBQ3hELHFCQUFxQjtJQUNyQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFOUIsNkNBQTZDO0lBQzdDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFakMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzRSxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFcEIsNkVBQTZFO0lBQzdFLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNsQixVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBRyxVQUFVLEdBQUcsWUFBWSxJQUFJLFVBQVUsRUFBRSxDQUFDO0FBQ3RELENBQUM7QUFwQkQsOENBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgVHJlZSwgbm9ybWFsaXplUGF0aCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gZmluZCB0aGUgXCJjbG9zZXN0XCIgbW9kdWxlIHRvIGEgZ2VuZXJhdGVkIGZpbGUncyBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE1vZHVsZShob3N0OiBUcmVlLCBnZW5lcmF0ZURpcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IGNsb3Nlc3RNb2R1bGUgPSBnZW5lcmF0ZURpci5lbmRzV2l0aCgnLycpID8gZ2VuZXJhdGVEaXIgOiBnZW5lcmF0ZURpciArICcvJztcbiAgY29uc3QgYWxsRmlsZXMgPSBob3N0LmZpbGVzO1xuXG4gIGxldCBtb2R1bGVQYXRoOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgY29uc3QgbW9kdWxlUmUgPSAvXFwubW9kdWxlXFwudHMkLztcbiAgd2hpbGUgKGNsb3Nlc3RNb2R1bGUpIHtcbiAgICBjb25zdCBub3JtYWxpemVkUm9vdCA9IG5vcm1hbGl6ZVBhdGgoY2xvc2VzdE1vZHVsZSk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGFsbEZpbGVzLmZpbHRlcihwID0+IG1vZHVsZVJlLnRlc3QocCkgJiYgcC5zdGFydHNXaXRoKG5vcm1hbGl6ZWRSb290KSk7XG5cbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgICAgbW9kdWxlUGF0aCA9IG1hdGNoZXNbMF07XG4gICAgICBicmVhaztcbiAgICB9IGVsc2UgaWYgKG1hdGNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb3JlIHRoYW4gb25lIG1vZHVsZSBtYXRjaGVzLiBVc2Ugc2tpcC1pbXBvcnQgb3B0aW9uIHRvIHNraXAgaW1wb3J0aW5nICdcbiAgICAgICAgKyAndGhlIGNvbXBvbmVudCBpbnRvIHRoZSBjbG9zZXN0IG1vZHVsZS4nKTtcbiAgICB9XG4gICAgY2xvc2VzdE1vZHVsZSA9IGNsb3Nlc3RNb2R1bGUuc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkuam9pbignLycpO1xuICB9XG5cbiAgaWYgKCFtb2R1bGVQYXRoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBhbiBOZ01vZHVsZSBmb3IgdGhlIG5ldyBjb21wb25lbnQuIFVzZSB0aGUgc2tpcC1pbXBvcnQgJ1xuICAgICAgKyAnb3B0aW9uIHRvIHNraXAgaW1wb3J0aW5nIGNvbXBvbmVudHMgaW4gTmdNb2R1bGUuJyk7XG4gIH1cblxuICByZXR1cm4gbW9kdWxlUGF0aDtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIHJlbGF0aXZlIHBhdGggZnJvbSBvbmUgZmlsZSBwYXRoIHRvIGFub3RoZXIgZmlsZSBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRSZWxhdGl2ZVBhdGgoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSB7XG4gIC8vIENvbnZlcnQgdG8gYXJyYXlzLlxuICBjb25zdCBmcm9tUGFydHMgPSBmcm9tLnNwbGl0KCcvJyk7XG4gIGNvbnN0IHRvUGFydHMgPSB0by5zcGxpdCgnLycpO1xuXG4gIC8vIFJlbW92ZSBmaWxlIG5hbWVzIChwcmVzZXJ2aW5nIGRlc3RpbmF0aW9uKVxuICBmcm9tUGFydHMucG9wKCk7XG4gIGNvbnN0IHRvRmlsZU5hbWUgPSB0b1BhcnRzLnBvcCgpO1xuXG4gIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHBhdGgucmVsYXRpdmUoZnJvbVBhcnRzLmpvaW4oJy8nKSwgdG9QYXJ0cy5qb2luKCcvJykpO1xuICBsZXQgcGF0aFByZWZpeCA9ICcnO1xuXG4gIC8vIFNldCB0aGUgcGF0aCBwcmVmaXggZm9yIHNhbWUgZGlyIG9yIGNoaWxkIGRpciwgcGFyZW50IGRpciBzdGFydHMgd2l0aCBgLi5gXG4gIGlmICghcmVsYXRpdmVQYXRoKSB7XG4gICAgcGF0aFByZWZpeCA9ICcuJztcbiAgfSBlbHNlIGlmICghcmVsYXRpdmVQYXRoLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgIHBhdGhQcmVmaXggPSBgLi9gO1xuICB9XG5cbiAgcmV0dXJuIGAke3BhdGhQcmVmaXh9JHtyZWxhdGl2ZVBhdGh9LyR7dG9GaWxlTmFtZX1gO1xufVxuIl19