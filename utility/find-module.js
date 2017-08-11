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
        if (host.exists(modulePath)) {
            return schematics_1.normalizePath(modulePath);
        }
        else if (host.exists(modulePath + '.ts')) {
            return schematics_1.normalizePath(modulePath + '.ts');
        }
        else if (host.exists(modulePath + '.module.ts')) {
            return schematics_1.normalizePath(modulePath + '.module.ts');
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
    return (pathPrefix.endsWith('/') ? pathPrefix : pathPrefix + '/')
        + (relative ? relative + '/' : '') + toFileName;
}
exports.buildRelativePath = buildRelativePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvZmluZC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwyREFBOEY7QUFDOUYsd0NBQXVDO0FBYXZDOztHQUVHO0FBQ0gsK0JBQXNDLElBQVUsRUFDVixPQUFzQjtJQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2NBQ3RELENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLG1CQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFeEUsTUFBTSxDQUFDLDBCQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDakYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxD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QyxNQUFNLFFBQVEsR0FBRyx5QkFBWSxDQUFDLDBCQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUNsQywwQkFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUVwQiw2RUFBNkU7SUFDN0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2QsVUFBVSxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLEdBQUcsVUFBVSxHQUFHLEdBQUcsQ0FBQztVQUMxRCxDQUFDLFFBQVEsR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztBQUN2RCxDQUFDO0FBekJELDhDQXlCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IFNjaGVtYXRpY1BhdGgsIFRyZWUsIG5vcm1hbGl6ZVBhdGgsIHJlbGF0aXZlUGF0aCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IGRhc2hlcml6ZSB9IGZyb20gJy4uL3N0cmluZ3MnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kdWxlT3B0aW9ucyB7XG4gIG1vZHVsZT86IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBmbGF0PzogYm9vbGVhbjtcbiAgc291cmNlRGlyPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBza2lwSW1wb3J0PzogYm9vbGVhbjtcbn1cblxuXG4vKipcbiAqIEZpbmQgdGhlIG1vZHVsZSByZWZlcmVkIGJ5IGEgc2V0IG9mIG9wdGlvbnMgcGFzc2VkIHRvIHRoZSBzY2hlbWF0aWNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3Q6IFRyZWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IE1vZHVsZU9wdGlvbnMpOiBTY2hlbWF0aWNQYXRoIHwgdW5kZWZpbmVkIHtcbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NraXBJbXBvcnQnKSAmJiBvcHRpb25zLnNraXBJbXBvcnQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLm1vZHVsZSkge1xuICAgIGNvbnN0IHBhdGhUb0NoZWNrID0gKG9wdGlvbnMuc291cmNlRGlyIHx8ICcnKSArICcvJyArIChvcHRpb25zLnBhdGggfHwgJycpXG4gICAgICAgICAgICAgICAgICAgICAgKyAob3B0aW9ucy5mbGF0ID8gJycgOiAnLycgKyBkYXNoZXJpemUob3B0aW9ucy5uYW1lKSk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplUGF0aChmaW5kTW9kdWxlKGhvc3QsIHBhdGhUb0NoZWNrKSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG9wdGlvbnMuc291cmNlRGlyICsgJy8nICsgb3B0aW9ucy5wYXRoICsgJy8nICsgb3B0aW9ucy5tb2R1bGU7XG4gICAgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGgpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplUGF0aChtb2R1bGVQYXRoKTtcbiAgICB9IGVsc2UgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGggKyAnLnRzJykpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemVQYXRoKG1vZHVsZVBhdGggKyAnLnRzJyk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy5tb2R1bGUudHMnKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZVBhdGgobW9kdWxlUGF0aCArICcubW9kdWxlLnRzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3BlY2lmaWVkIG1vZHVsZSBkb2VzIG5vdCBleGlzdCcpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGZpbmQgdGhlIFwiY2xvc2VzdFwiIG1vZHVsZSB0byBhIGdlbmVyYXRlZCBmaWxlJ3MgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRNb2R1bGUoaG9zdDogVHJlZSwgZ2VuZXJhdGVEaXI6IHN0cmluZyk6IFNjaGVtYXRpY1BhdGgge1xuICBsZXQgY2xvc2VzdE1vZHVsZSA9IGdlbmVyYXRlRGlyO1xuICBjb25zdCBhbGxGaWxlcyA9IGhvc3QuZmlsZXM7XG5cbiAgbGV0IG1vZHVsZVBhdGg6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBjb25zdCBtb2R1bGVSZSA9IC9cXC5tb2R1bGVcXC50cyQvO1xuICBjb25zdCByb3V0aW5nTW9kdWxlUmUgPSAvLXJvdXRpbmdcXC5tb2R1bGVcXC50cy87XG4gIHdoaWxlIChjbG9zZXN0TW9kdWxlKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZFJvb3QgPSBub3JtYWxpemVQYXRoKGNsb3Nlc3RNb2R1bGUpO1xuICAgIGNvbnN0IG1hdGNoZXMgPSBhbGxGaWxlc1xuICAgICAgLmZpbHRlcihwID0+IG1vZHVsZVJlLnRlc3QocCkgJiYgIXJvdXRpbmdNb2R1bGVSZS50ZXN0KHApICYmIHAuc3RhcnRzV2l0aChub3JtYWxpemVkUm9vdCkpO1xuXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09IDEpIHtcbiAgICAgIG1vZHVsZVBhdGggPSBtYXRjaGVzWzBdO1xuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIGlmIChtYXRjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTW9yZSB0aGFuIG9uZSBtb2R1bGUgbWF0Y2hlcy4gVXNlIHNraXAtaW1wb3J0IG9wdGlvbiB0byBza2lwIGltcG9ydGluZyAnXG4gICAgICAgICsgJ3RoZSBjb21wb25lbnQgaW50byB0aGUgY2xvc2VzdCBtb2R1bGUuJyk7XG4gICAgfVxuICAgIGNsb3Nlc3RNb2R1bGUgPSBjbG9zZXN0TW9kdWxlLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmpvaW4oJy8nKTtcbiAgfVxuXG4gIGlmICghbW9kdWxlUGF0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgYW4gTmdNb2R1bGUgZm9yIHRoZSBuZXcgY29tcG9uZW50LiBVc2UgdGhlIHNraXAtaW1wb3J0ICdcbiAgICAgICsgJ29wdGlvbiB0byBza2lwIGltcG9ydGluZyBjb21wb25lbnRzIGluIE5nTW9kdWxlLicpO1xuICB9XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZVBhdGgobW9kdWxlUGF0aCk7XG59XG5cbi8qKlxuICogQnVpbGQgYSByZWxhdGl2ZSBwYXRoIGZyb20gb25lIGZpbGUgcGF0aCB0byBhbm90aGVyIGZpbGUgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUmVsYXRpdmVQYXRoKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHN0cmluZyB7XG4gIGZyb20gPSBub3JtYWxpemVQYXRoKGZyb20pO1xuICB0byA9IG5vcm1hbGl6ZVBhdGgodG8pO1xuXG4gIC8vIENvbnZlcnQgdG8gYXJyYXlzLlxuICBjb25zdCBmcm9tUGFydHMgPSBmcm9tLnNwbGl0KCcvJyk7XG4gIGNvbnN0IHRvUGFydHMgPSB0by5zcGxpdCgnLycpO1xuXG4gIC8vIFJlbW92ZSBmaWxlIG5hbWVzIChwcmVzZXJ2aW5nIGRlc3RpbmF0aW9uKVxuICBmcm9tUGFydHMucG9wKCk7XG4gIGNvbnN0IHRvRmlsZU5hbWUgPSB0b1BhcnRzLnBvcCgpO1xuXG4gIGNvbnN0IHJlbGF0aXZlID0gcmVsYXRpdmVQYXRoKG5vcm1hbGl6ZVBhdGgoZnJvbVBhcnRzLmpvaW4oJy8nKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZVBhdGgodG9QYXJ0cy5qb2luKCcvJykpKTtcbiAgbGV0IHBhdGhQcmVmaXggPSAnJztcblxuICAvLyBTZXQgdGhlIHBhdGggcHJlZml4IGZvciBzYW1lIGRpciBvciBjaGlsZCBkaXIsIHBhcmVudCBkaXIgc3RhcnRzIHdpdGggYC4uYFxuICBpZiAoIXJlbGF0aXZlKSB7XG4gICAgcGF0aFByZWZpeCA9ICcuJztcbiAgfSBlbHNlIGlmICghcmVsYXRpdmUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgcGF0aFByZWZpeCA9IGAuL2A7XG4gIH1cblxuICByZXR1cm4gKHBhdGhQcmVmaXguZW5kc1dpdGgoJy8nKSA/IHBhdGhQcmVmaXggOiBwYXRoUHJlZml4ICsgJy8nKVxuICAgICAgICsgKHJlbGF0aXZlID8gcmVsYXRpdmUgKyAnLycgOiAnJykgKyB0b0ZpbGVOYW1lO1xufVxuIl19