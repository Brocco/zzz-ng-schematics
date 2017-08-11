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
        const modulePath = schematics_1.normalizePath(options.sourceDir + '/' + options.path + '/' + options.module);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvZmluZC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwyREFBOEY7QUFDOUYsd0NBQXVDO0FBYXZDOztHQUVHO0FBQ0gsK0JBQXNDLElBQVUsRUFDVixPQUFzQjtJQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2NBQ3RELENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLG1CQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFeEUsTUFBTSxDQUFDLDBCQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sVUFBVSxHQUFHLDBCQUFhLENBQzlCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMs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Q29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBTY2hlbWF0aWNQYXRoLCBUcmVlLCBub3JtYWxpemVQYXRoLCByZWxhdGl2ZVBhdGggfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBkYXNoZXJpemUgfSBmcm9tICcuLi9zdHJpbmdzJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZHVsZU9wdGlvbnMge1xuICBtb2R1bGU/OiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgZmxhdD86IGJvb2xlYW47XG4gIHNvdXJjZURpcj86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgc2tpcEltcG9ydD86IGJvb2xlYW47XG59XG5cblxuLyoqXG4gKiBGaW5kIHRoZSBtb2R1bGUgcmVmZXJlZCBieSBhIHNldCBvZiBvcHRpb25zIHBhc3NlZCB0byB0aGUgc2NoZW1hdGljcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyhob3N0OiBUcmVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBNb2R1bGVPcHRpb25zKTogU2NoZW1hdGljUGF0aCB8IHVuZGVmaW5lZCB7XG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdza2lwSW1wb3J0JykgJiYgb3B0aW9ucy5za2lwSW1wb3J0KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5tb2R1bGUpIHtcbiAgICBjb25zdCBwYXRoVG9DaGVjayA9IChvcHRpb25zLnNvdXJjZURpciB8fCAnJykgKyAnLycgKyAob3B0aW9ucy5wYXRoIHx8ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICsgKG9wdGlvbnMuZmxhdCA/ICcnIDogJy8nICsgZGFzaGVyaXplKG9wdGlvbnMubmFtZSkpO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZVBhdGgoZmluZE1vZHVsZShob3N0LCBwYXRoVG9DaGVjaykpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG1vZHVsZVBhdGggPSBub3JtYWxpemVQYXRoKFxuICAgICAgb3B0aW9ucy5zb3VyY2VEaXIgKyAnLycgKyBvcHRpb25zLnBhdGggKyAnLycgKyBvcHRpb25zLm1vZHVsZSk7XG4gICAgY29uc3QgbW9kdWxlQmFzZU5hbWUgPSBvcHRpb25zLm1vZHVsZS5zcGxpdCgnLycpLnBvcCgpO1xuICAgIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZVBhdGgobW9kdWxlUGF0aCk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy50cycpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplUGF0aChtb2R1bGVQYXRoICsgJy50cycpO1xuICAgIH0gZWxzZSBpZiAoaG9zdC5leGlzdHMobW9kdWxlUGF0aCArICcubW9kdWxlLnRzJykpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemVQYXRoKG1vZHVsZVBhdGggKyAnLm1vZHVsZS50cycpO1xuICAgIH0gZWxzZSBpZiAoaG9zdC5leGlzdHMobW9kdWxlUGF0aCArICcvJyArIG1vZHVsZUJhc2VOYW1lICsgJy5tb2R1bGUudHMnKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZVBhdGgobW9kdWxlUGF0aCArICcvJyArIG1vZHVsZUJhc2VOYW1lICsgJy5tb2R1bGUudHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVjaWZpZWQgbW9kdWxlIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gZmluZCB0aGUgXCJjbG9zZXN0XCIgbW9kdWxlIHRvIGEgZ2VuZXJhdGVkIGZpbGUncyBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE1vZHVsZShob3N0OiBUcmVlLCBnZW5lcmF0ZURpcjogc3RyaW5nKTogU2NoZW1hdGljUGF0aCB7XG4gIGxldCBjbG9zZXN0TW9kdWxlID0gZ2VuZXJhdGVEaXI7XG4gIGNvbnN0IGFsbEZpbGVzID0gaG9zdC5maWxlcztcblxuICBsZXQgbW9kdWxlUGF0aDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGNvbnN0IG1vZHVsZVJlID0gL1xcLm1vZHVsZVxcLnRzJC87XG4gIGNvbnN0IHJvdXRpbmdNb2R1bGVSZSA9IC8tcm91dGluZ1xcLm1vZHVsZVxcLnRzLztcbiAgd2hpbGUgKGNsb3Nlc3RNb2R1bGUpIHtcbiAgICBjb25zdCBub3JtYWxpemVkUm9vdCA9IG5vcm1hbGl6ZVBhdGgoY2xvc2VzdE1vZHVsZSk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGFsbEZpbGVzXG4gICAgICAuZmlsdGVyKHAgPT4gbW9kdWxlUmUudGVzdChwKSAmJiAhcm91dGluZ01vZHVsZVJlLnRlc3QocCkgJiYgcC5zdGFydHNXaXRoKG5vcm1hbGl6ZWRSb290KSk7XG5cbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgICAgbW9kdWxlUGF0aCA9IG1hdGNoZXNbMF07XG4gICAgICBicmVhaztcbiAgICB9IGVsc2UgaWYgKG1hdGNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb3JlIHRoYW4gb25lIG1vZHVsZSBtYXRjaGVzLiBVc2Ugc2tpcC1pbXBvcnQgb3B0aW9uIHRvIHNraXAgaW1wb3J0aW5nICdcbiAgICAgICAgKyAndGhlIGNvbXBvbmVudCBpbnRvIHRoZSBjbG9zZXN0IG1vZHVsZS4nKTtcbiAgICB9XG4gICAgY2xvc2VzdE1vZHVsZSA9IGNsb3Nlc3RNb2R1bGUuc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkuam9pbignLycpO1xuICB9XG5cbiAgaWYgKCFtb2R1bGVQYXRoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBhbiBOZ01vZHVsZSBmb3IgdGhlIG5ldyBjb21wb25lbnQuIFVzZSB0aGUgc2tpcC1pbXBvcnQgJ1xuICAgICAgKyAnb3B0aW9uIHRvIHNraXAgaW1wb3J0aW5nIGNvbXBvbmVudHMgaW4gTmdNb2R1bGUuJyk7XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplUGF0aChtb2R1bGVQYXRoKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIHJlbGF0aXZlIHBhdGggZnJvbSBvbmUgZmlsZSBwYXRoIHRvIGFub3RoZXIgZmlsZSBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRSZWxhdGl2ZVBhdGgoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZnJvbSA9IG5vcm1hbGl6ZVBhdGgoZnJvbSk7XG4gIHRvID0gbm9ybWFsaXplUGF0aCh0byk7XG5cbiAgLy8gQ29udmVydCB0byBhcnJheXMuXG4gIGNvbnN0IGZyb21QYXJ0cyA9IGZyb20uc3BsaXQoJy8nKTtcbiAgY29uc3QgdG9QYXJ0cyA9IHRvLnNwbGl0KCcvJyk7XG5cbiAgLy8gUmVtb3ZlIGZpbGUgbmFtZXMgKHByZXNlcnZpbmcgZGVzdGluYXRpb24pXG4gIGZyb21QYXJ0cy5wb3AoKTtcbiAgY29uc3QgdG9GaWxlTmFtZSA9IHRvUGFydHMucG9wKCk7XG5cbiAgY29uc3QgcmVsYXRpdmUgPSByZWxhdGl2ZVBhdGgobm9ybWFsaXplUGF0aChmcm9tUGFydHMuam9pbignLycpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplUGF0aCh0b1BhcnRzLmpvaW4oJy8nKSkpO1xuICBsZXQgcGF0aFByZWZpeCA9ICcnO1xuXG4gIC8vIFNldCB0aGUgcGF0aCBwcmVmaXggZm9yIHNhbWUgZGlyIG9yIGNoaWxkIGRpciwgcGFyZW50IGRpciBzdGFydHMgd2l0aCBgLi5gXG4gIGlmICghcmVsYXRpdmUpIHtcbiAgICBwYXRoUHJlZml4ID0gJy4nO1xuICB9IGVsc2UgaWYgKCFyZWxhdGl2ZS5zdGFydHNXaXRoKCcuJykpIHtcbiAgICBwYXRoUHJlZml4ID0gYC4vYDtcbiAgfVxuICBpZiAocGF0aFByZWZpeCAmJiAhcGF0aFByZWZpeC5lbmRzV2l0aCgnLycpKSB7XG4gICAgcGF0aFByZWZpeCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gcGF0aFByZWZpeCArIChyZWxhdGl2ZSA/IHJlbGF0aXZlICsgJy8nIDogJycpICsgdG9GaWxlTmFtZTtcbn1cbiJdfQ==