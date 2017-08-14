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
        const moduleBaseName = schematics_1.normalizePath(options.module).split('/').pop();
        console.log('checks:');
        console.log('  ', modulePath);
        console.log('  ', modulePath + '.ts');
        console.log('  ', modulePath + '.module.ts');
        console.log('  ', modulePath + '/' + moduleBaseName + '.module.ts');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2Jyb2Njby9kZXYvZGV2a2l0LyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvZmluZC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwyREFBOEY7QUFDOUYsd0NBQXVDO0FBYXZDOztHQUVHO0FBQ0gsK0JBQXNDLElBQVUsRUFDVixPQUFzQjtJQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2NBQ3RELENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLG1CQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFeEUsTUFBTSxDQUFDLDBCQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sVUFBVSxHQUFHLDBCQUFhLENBQzlCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRSxNQUFNLGNBQWMsR0FBRywwQkFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFL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QUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsVUFBVSxJQUFJLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztBQUNwRSxDQUFDO0FBM0JELDhDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IFNjaGVtYXRpY1BhdGgsIFRyZWUsIG5vcm1hbGl6ZVBhdGgsIHJlbGF0aXZlUGF0aCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IGRhc2hlcml6ZSB9IGZyb20gJy4uL3N0cmluZ3MnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kdWxlT3B0aW9ucyB7XG4gIG1vZHVsZT86IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBmbGF0PzogYm9vbGVhbjtcbiAgc291cmNlRGlyPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBza2lwSW1wb3J0PzogYm9vbGVhbjtcbn1cblxuXG4vKipcbiAqIEZpbmQgdGhlIG1vZHVsZSByZWZlcmVkIGJ5IGEgc2V0IG9mIG9wdGlvbnMgcGFzc2VkIHRvIHRoZSBzY2hlbWF0aWNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE1vZHVsZUZyb21PcHRpb25zKGhvc3Q6IFRyZWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IE1vZHVsZU9wdGlvbnMpOiBTY2hlbWF0aWNQYXRoIHwgdW5kZWZpbmVkIHtcbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NraXBJbXBvcnQnKSAmJiBvcHRpb25zLnNraXBJbXBvcnQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLm1vZHVsZSkge1xuICAgIGNvbnN0IHBhdGhUb0NoZWNrID0gKG9wdGlvbnMuc291cmNlRGlyIHx8ICcnKSArICcvJyArIChvcHRpb25zLnBhdGggfHwgJycpXG4gICAgICAgICAgICAgICAgICAgICAgKyAob3B0aW9ucy5mbGF0ID8gJycgOiAnLycgKyBkYXNoZXJpemUob3B0aW9ucy5uYW1lKSk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplUGF0aChmaW5kTW9kdWxlKGhvc3QsIHBhdGhUb0NoZWNrKSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG5vcm1hbGl6ZVBhdGgoXG4gICAgICBvcHRpb25zLnNvdXJjZURpciArICcvJyArIG9wdGlvbnMucGF0aCArICcvJyArIG9wdGlvbnMubW9kdWxlKTtcbiAgICBjb25zdCBtb2R1bGVCYXNlTmFtZSA9IG5vcm1hbGl6ZVBhdGgob3B0aW9ucy5tb2R1bGUpLnNwbGl0KCcvJykucG9wKCk7XG4gICAgY29uc29sZS5sb2coJ2NoZWNrczonKTtcbiAgICBjb25zb2xlLmxvZygnICAnLCBtb2R1bGVQYXRoKTtcbiAgICBjb25zb2xlLmxvZygnICAnLCBtb2R1bGVQYXRoICsgJy50cycpO1xuICAgIGNvbnNvbGUubG9nKCcgICcsIG1vZHVsZVBhdGggKyAnLm1vZHVsZS50cycpO1xuICAgIGNvbnNvbGUubG9nKCcgICcsIG1vZHVsZVBhdGggKyAnLycgKyBtb2R1bGVCYXNlTmFtZSArICcubW9kdWxlLnRzJyk7XG4gICAgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGgpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplUGF0aChtb2R1bGVQYXRoKTtcbiAgICB9IGVsc2UgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGggKyAnLnRzJykpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemVQYXRoKG1vZHVsZVBhdGggKyAnLnRzJyk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy5tb2R1bGUudHMnKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZVBhdGgobW9kdWxlUGF0aCArICcubW9kdWxlLnRzJyk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy8nICsgbW9kdWxlQmFzZU5hbWUgKyAnLm1vZHVsZS50cycpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplUGF0aChtb2R1bGVQYXRoICsgJy8nICsgbW9kdWxlQmFzZU5hbWUgKyAnLm1vZHVsZS50cycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwZWNpZmllZCBtb2R1bGUgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBmaW5kIHRoZSBcImNsb3Nlc3RcIiBtb2R1bGUgdG8gYSBnZW5lcmF0ZWQgZmlsZSdzIHBhdGguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTW9kdWxlKGhvc3Q6IFRyZWUsIGdlbmVyYXRlRGlyOiBzdHJpbmcpOiBTY2hlbWF0aWNQYXRoIHtcbiAgbGV0IGNsb3Nlc3RNb2R1bGUgPSBnZW5lcmF0ZURpcjtcbiAgY29uc3QgYWxsRmlsZXMgPSBob3N0LmZpbGVzO1xuXG4gIGxldCBtb2R1bGVQYXRoOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgY29uc3QgbW9kdWxlUmUgPSAvXFwubW9kdWxlXFwudHMkLztcbiAgY29uc3Qgcm91dGluZ01vZHVsZVJlID0gLy1yb3V0aW5nXFwubW9kdWxlXFwudHMvO1xuICB3aGlsZSAoY2xvc2VzdE1vZHVsZSkge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRSb290ID0gbm9ybWFsaXplUGF0aChjbG9zZXN0TW9kdWxlKTtcbiAgICBjb25zdCBtYXRjaGVzID0gYWxsRmlsZXNcbiAgICAgIC5maWx0ZXIocCA9PiBtb2R1bGVSZS50ZXN0KHApICYmICFyb3V0aW5nTW9kdWxlUmUudGVzdChwKSAmJiBwLnN0YXJ0c1dpdGgobm9ybWFsaXplZFJvb3QpKTtcblxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICBtb2R1bGVQYXRoID0gbWF0Y2hlc1swXTtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAobWF0Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vcmUgdGhhbiBvbmUgbW9kdWxlIG1hdGNoZXMuIFVzZSBza2lwLWltcG9ydCBvcHRpb24gdG8gc2tpcCBpbXBvcnRpbmcgJ1xuICAgICAgICArICd0aGUgY29tcG9uZW50IGludG8gdGhlIGNsb3Nlc3QgbW9kdWxlLicpO1xuICAgIH1cbiAgICBjbG9zZXN0TW9kdWxlID0gY2xvc2VzdE1vZHVsZS5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5qb2luKCcvJyk7XG4gIH1cblxuICBpZiAoIW1vZHVsZVBhdGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGFuIE5nTW9kdWxlIGZvciB0aGUgbmV3IGNvbXBvbmVudC4gVXNlIHRoZSBza2lwLWltcG9ydCAnXG4gICAgICArICdvcHRpb24gdG8gc2tpcCBpbXBvcnRpbmcgY29tcG9uZW50cyBpbiBOZ01vZHVsZS4nKTtcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVQYXRoKG1vZHVsZVBhdGgpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgcmVsYXRpdmUgcGF0aCBmcm9tIG9uZSBmaWxlIHBhdGggdG8gYW5vdGhlciBmaWxlIHBhdGguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFJlbGF0aXZlUGF0aChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBzdHJpbmcge1xuICBmcm9tID0gbm9ybWFsaXplUGF0aChmcm9tKTtcbiAgdG8gPSBub3JtYWxpemVQYXRoKHRvKTtcblxuICAvLyBDb252ZXJ0IHRvIGFycmF5cy5cbiAgY29uc3QgZnJvbVBhcnRzID0gZnJvbS5zcGxpdCgnLycpO1xuICBjb25zdCB0b1BhcnRzID0gdG8uc3BsaXQoJy8nKTtcblxuICAvLyBSZW1vdmUgZmlsZSBuYW1lcyAocHJlc2VydmluZyBkZXN0aW5hdGlvbilcbiAgZnJvbVBhcnRzLnBvcCgpO1xuICBjb25zdCB0b0ZpbGVOYW1lID0gdG9QYXJ0cy5wb3AoKTtcblxuICBjb25zdCByZWxhdGl2ZSA9IHJlbGF0aXZlUGF0aChub3JtYWxpemVQYXRoKGZyb21QYXJ0cy5qb2luKCcvJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVQYXRoKHRvUGFydHMuam9pbignLycpKSk7XG4gIGxldCBwYXRoUHJlZml4ID0gJyc7XG5cbiAgLy8gU2V0IHRoZSBwYXRoIHByZWZpeCBmb3Igc2FtZSBkaXIgb3IgY2hpbGQgZGlyLCBwYXJlbnQgZGlyIHN0YXJ0cyB3aXRoIGAuLmBcbiAgaWYgKCFyZWxhdGl2ZSkge1xuICAgIHBhdGhQcmVmaXggPSAnLic7XG4gIH0gZWxzZSBpZiAoIXJlbGF0aXZlLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgIHBhdGhQcmVmaXggPSBgLi9gO1xuICB9XG4gIGlmIChwYXRoUHJlZml4ICYmICFwYXRoUHJlZml4LmVuZHNXaXRoKCcvJykpIHtcbiAgICBwYXRoUHJlZml4ICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiBwYXRoUHJlZml4ICsgKHJlbGF0aXZlID8gcmVsYXRpdmUgKyAnLycgOiAnJykgKyB0b0ZpbGVOYW1lO1xufVxuIl19