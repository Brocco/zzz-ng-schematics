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
const strings_1 = require("../strings");
/**
 * Find the module refered by a set of options passed to the schematics.
 */
function findModuleFromOptions(host, options) {
    if (options.hasOwnProperty('skipImport') && options.skipImport) {
        return undefined;
    }
    if (!options.module) {
        const pathToCheck = (options.sourceDir || '') + '/' + (options.path || '')
            + (options.flat ? '' : '/' + strings_1.dasherize(options.name));
        return schematics_1.normalizePath(findModule(host, pathToCheck));
    }
    else {
        const modulePath = options.sourceDir + '/' + options.path + '/' + options.module;
        const moduleBaseName = options.module.split('/').pop();
        if (host.exists(modulePath)) {
            return schematics_1.normalizePath(modulePath);
        }
        else if (host.exists(modulePath + '.ts')) {
            return schematics_1.normalizePath(modulePath + '.ts');
        }
        else if (host.exists(modulePath + '.module.ts')) {
            return schematics_1.normalizePath(modulePath + '.module.ts');
        }
        else if (host.exists(modulePath + '/' + moduleBaseName + '.module.ts')) {
            return schematics_1.normalizePath(modulePath + '/' + moduleBaseName + '.module.ts');
        }
        else {
            throw new Error('Specified module does not exist');
        }
    }
}
exports.findModuleFromOptions = findModuleFromOptions;
/**
 * Function to find the "closest" module to a generated file's path.
 */
function findModule(host, generateDir) {
    let closestModule = generateDir;
    const allFiles = host.files;
    let modulePath = null;
    const moduleRe = /\.module\.ts$/;
    const routingModuleRe = /-routing\.module\.ts/;
    while (closestModule) {
        const normalizedRoot = schematics_1.normalizePath(closestModule);
        const matches = allFiles
            .filter(p => moduleRe.test(p) && !routingModuleRe.test(p) && p.startsWith(normalizedRoot));
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
    return schematics_1.normalizePath(modulePath);
}
exports.findModule = findModule;
/**
 * Build a relative path from one file path to another file path.
 */
function buildRelativePath(from, to) {
    from = schematics_1.normalizePath(from);
    to = schematics_1.normalizePath(to);
    // Convert to arrays.
    const fromParts = from.split('/');
    const toParts = to.split('/');
    // Remove file names (preserving destination)
    fromParts.pop();
    const toFileName = toParts.pop();
    const relative = schematics_1.relativePath(schematics_1.normalizePath(fromParts.join('/')), schematics_1.normalizePath(toParts.join('/')));
    let pathPrefix = '';
    // Set the path prefix for same dir or child dir, parent dir starts with `..`
    if (!relative) {
        pathPrefix = '.';
    }
    else if (!relative.startsWith('.')) {
        pathPrefix = `./`;
    }
    if (pathPrefix && !pathPrefix.endsWith('/')) {
        pathPrefix += '/';
    }
    return pathPrefix + (relative ? relative + '/' : '') + toFileName;
}
exports.buildRelativePath = buildRelativePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvZmluZC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwyREFBOEY7QUFDOUYsd0NBQXVDO0FBYXZDOztHQUVHO0FBQ0gsK0JBQXNDLElBQVUsRUFDVixPQUFzQjtJQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2NBQ3RELENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLG1CQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFeEUsTUFBTSxDQUFDLDBCQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDakYsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLDBCQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLDBCQUFhLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQywwQkFBYSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxjQUFjLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sQ0FBQywwQkFBYSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsY0FBYyxHQUFHLFlBQVksQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUNyRCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUExQkQsc0RBMEJDO0FBRUQ7O0dBRUc7QUFDSCxvQkFBMkIsSUFBVSxFQUFFLFdBQW1CO0lBQ3hELElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQztJQUNoQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBRTVCLElBQUksVUFBVSxHQUFrQixJQUFJLENBQUM7SUFDckMsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDO0lBQ2pDLE1BQU0sZUFBZSxHQUFHLHNCQUFzQixDQUFDO0lBQy9DLE9BQU8sYUFBYSxFQUFFLENBQUM7UUFDckIsTUFBTSxjQUFjLEdBQUcsMEJBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxNQUFNLE9BQU8sR0FBRyxRQUFRO2FBQ3JCLE1BQU0sQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRTdGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssQ0FBQztRQUNSLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMseUVBQXlFO2tCQUNyRix3Q0FBd0MsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxhQUFhLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0U7Y0FDcEYsa0RBQWtELENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsTUFBTSxDQUFDLDBCQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQTVCRCxnQ0E0QkM7QUFFRDs7R0FFRztBQUNILDJCQUFrQyxJQUFZLEVBQUUsRUFBVTtJQUN4RCxJQUFJLEdBQUcsMEJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixFQUFFLEdBQUcsMEJBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV2QixxQkFBcUI7SUFDckIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlCLDZDQUE2QztJQUM3QyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEIsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRWpDLE1BQU0sUUFBUSxHQUFHLHlCQUFZLENBQUMsMEJBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2xDLDBCQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXBCLDZFQUE2RTtJQUM3RSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDZCxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxVQUFVLElBQUksR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQ3BFLENBQUM7QUEzQkQsOENBMkJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgU2NoZW1hdGljUGF0aCwgVHJlZSwgbm9ybWFsaXplUGF0aCwgcmVsYXRpdmVQYXRoIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgZGFzaGVyaXplIH0gZnJvbSAnLi4vc3RyaW5ncyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBNb2R1bGVPcHRpb25zIHtcbiAgbW9kdWxlPzogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGZsYXQ/OiBib29sZWFuO1xuICBzb3VyY2VEaXI/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIHNraXBJbXBvcnQ/OiBib29sZWFuO1xufVxuXG5cbi8qKlxuICogRmluZCB0aGUgbW9kdWxlIHJlZmVyZWQgYnkgYSBzZXQgb2Ygb3B0aW9ucyBwYXNzZWQgdG8gdGhlIHNjaGVtYXRpY3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTW9kdWxlRnJvbU9wdGlvbnMoaG9zdDogVHJlZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogTW9kdWxlT3B0aW9ucyk6IFNjaGVtYXRpY1BhdGggfCB1bmRlZmluZWQge1xuICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2tpcEltcG9ydCcpICYmIG9wdGlvbnMuc2tpcEltcG9ydCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMubW9kdWxlKSB7XG4gICAgY29uc3QgcGF0aFRvQ2hlY2sgPSAob3B0aW9ucy5zb3VyY2VEaXIgfHwgJycpICsgJy8nICsgKG9wdGlvbnMucGF0aCB8fCAnJylcbiAgICAgICAgICAgICAgICAgICAgICArIChvcHRpb25zLmZsYXQgPyAnJyA6ICcvJyArIGRhc2hlcml6ZShvcHRpb25zLm5hbWUpKTtcblxuICAgIHJldHVybiBub3JtYWxpemVQYXRoKGZpbmRNb2R1bGUoaG9zdCwgcGF0aFRvQ2hlY2spKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBtb2R1bGVQYXRoID0gb3B0aW9ucy5zb3VyY2VEaXIgKyAnLycgKyBvcHRpb25zLnBhdGggKyAnLycgKyBvcHRpb25zLm1vZHVsZTtcbiAgICBjb25zdCBtb2R1bGVCYXNlTmFtZSA9IG9wdGlvbnMubW9kdWxlLnNwbGl0KCcvJykucG9wKCk7XG4gICAgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGgpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplUGF0aChtb2R1bGVQYXRoKTtcbiAgICB9IGVsc2UgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGggKyAnLnRzJykpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemVQYXRoKG1vZHVsZVBhdGggKyAnLnRzJyk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy5tb2R1bGUudHMnKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZVBhdGgobW9kdWxlUGF0aCArICcubW9kdWxlLnRzJyk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy8nICsgbW9kdWxlQmFzZU5hbWUgKyAnLm1vZHVsZS50cycpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplUGF0aChtb2R1bGVQYXRoICsgJy8nICsgbW9kdWxlQmFzZU5hbWUgKyAnLm1vZHVsZS50cycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZmllZCBtb2R1bGUgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBmaW5kIHRoZSBcImNsb3Nlc3RcIiBtb2R1bGUgdG8gYSBnZW5lcmF0ZWQgZmlsZSdzIHBhdGguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTW9kdWxlKGhvc3Q6IFRyZWUsIGdlbmVyYXRlRGlyOiBzdHJpbmcpOiBTY2hlbWF0aWNQYXRoIHtcbiAgbGV0IGNsb3Nlc3RNb2R1bGUgPSBnZW5lcmF0ZURpcjtcbiAgY29uc3QgYWxsRmlsZXMgPSBob3N0LmZpbGVzO1xuXG4gIGxldCBtb2R1bGVQYXRoOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgY29uc3QgbW9kdWxlUmUgPSAvXFwubW9kdWxlXFwudHMkLztcbiAgY29uc3Qgcm91dGluZ01vZHVsZVJlID0gLy1yb3V0aW5nXFwubW9kdWxlXFwudHMvO1xuICB3aGlsZSAoY2xvc2VzdE1vZHVsZSkge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRSb290ID0gbm9ybWFsaXplUGF0aChjbG9zZXN0TW9kdWxlKTtcbiAgICBjb25zdCBtYXRjaGVzID0gYWxsRmlsZXNcbiAgICAgIC5maWx0ZXIocCA9PiBtb2R1bGVSZS50ZXN0KHApICYmICFyb3V0aW5nTW9kdWxlUmUudGVzdChwKSAmJiBwLnN0YXJ0c1dpdGgobm9ybWFsaXplZFJvb3QpKTtcblxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICBtb2R1bGVQYXRoID0gbWF0Y2hlc1swXTtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAobWF0Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vcmUgdGhhbiBvbmUgbW9kdWxlIG1hdGNoZXMuIFVzZSBza2lwLWltcG9ydCBvcHRpb24gdG8gc2tpcCBpbXBvcnRpbmcgJ1xuICAgICAgICArICd0aGUgY29tcG9uZW50IGludG8gdGhlIGNsb3Nlc3QgbW9kdWxlLicpO1xuICAgIH1cbiAgICBjbG9zZXN0TW9kdWxlID0gY2xvc2VzdE1vZHVsZS5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5qb2luKCcvJyk7XG4gIH1cblxuICBpZiAoIW1vZHVsZVBhdGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGFuIE5nTW9kdWxlIGZvciB0aGUgbmV3IGNvbXBvbmVudC4gVXNlIHRoZSBza2lwLWltcG9ydCAnXG4gICAgICArICdvcHRpb24gdG8gc2tpcCBpbXBvcnRpbmcgY29tcG9uZW50cyBpbiBOZ01vZHVsZS4nKTtcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVQYXRoKG1vZHVsZVBhdGgpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgcmVsYXRpdmUgcGF0aCBmcm9tIG9uZSBmaWxlIHBhdGggdG8gYW5vdGhlciBmaWxlIHBhdGguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFJlbGF0aXZlUGF0aChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBzdHJpbmcge1xuICBmcm9tID0gbm9ybWFsaXplUGF0aChmcm9tKTtcbiAgdG8gPSBub3JtYWxpemVQYXRoKHRvKTtcblxuICAvLyBDb252ZXJ0IHRvIGFycmF5cy5cbiAgY29uc3QgZnJvbVBhcnRzID0gZnJvbS5zcGxpdCgnLycpO1xuICBjb25zdCB0b1BhcnRzID0gdG8uc3BsaXQoJy8nKTtcblxuICAvLyBSZW1vdmUgZmlsZSBuYW1lcyAocHJlc2VydmluZyBkZXN0aW5hdGlvbilcbiAgZnJvbVBhcnRzLnBvcCgpO1xuICBjb25zdCB0b0ZpbGVOYW1lID0gdG9QYXJ0cy5wb3AoKTtcblxuICBjb25zdCByZWxhdGl2ZSA9IHJlbGF0aXZlUGF0aChub3JtYWxpemVQYXRoKGZyb21QYXJ0cy5qb2luKCcvJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVQYXRoKHRvUGFydHMuam9pbignLycpKSk7XG4gIGxldCBwYXRoUHJlZml4ID0gJyc7XG5cbiAgLy8gU2V0IHRoZSBwYXRoIHByZWZpeCBmb3Igc2FtZSBkaXIgb3IgY2hpbGQgZGlyLCBwYXJlbnQgZGlyIHN0YXJ0cyB3aXRoIGAuLmBcbiAgaWYgKCFyZWxhdGl2ZSkge1xuICAgIHBhdGhQcmVmaXggPSAnLic7XG4gIH0gZWxzZSBpZiAoIXJlbGF0aXZlLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgIHBhdGhQcmVmaXggPSBgLi9gO1xuICB9XG4gIGlmIChwYXRoUHJlZml4ICYmICFwYXRoUHJlZml4LmVuZHNXaXRoKCcvJykpIHtcbiAgICBwYXRoUHJlZml4ICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiBwYXRoUHJlZml4ICsgKHJlbGF0aXZlID8gcmVsYXRpdmUgKyAnLycgOiAnJykgKyB0b0ZpbGVOYW1lO1xufVxuIl19