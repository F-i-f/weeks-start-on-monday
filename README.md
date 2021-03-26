Weeks Start on Monday Again... Gnome Shell Extension
====================================================

[![Build Status](https://travis-ci.org/F-i-f/weeks-start-on-monday.svg?branch=master)](https://travis-ci.org/F-i-f/weeks-start-on-monday)

![Calendar Screenshot](docs/screenshot.png)


## Overview

Weeks Start on Monday Again... is a re-implementation of the [Week
Start on
Monday...](https://extensions.gnome.org/extension/646/weeks-start-on-monday/)
Gnome Shell extension for newer Gnome Shell versions.

## Configuration

With Weeks Start on Monday Again, weeks can start any day of the week.
Just change it with the configuration panel, which can be
accessed from the "Tweaks" application or the [Gnome Shell Extensions
page](https://extensions.gnome.org/local/).

![Weeks Start on Monday Again... preference panel](docs/preferences.png)

## License

Weeks Start on Monday Again... is free software: you can redistribute
it and/or modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see [http://www.gnu.org/licenses/].

## Download / Install

Install directly from the [Gnome Shell Extensions
site](https://extensions.gnome.org/extension/1720/weeks-start-on-monday-again/).

Or download the zip file from the GitHub [releases
page](https://github.com/F-i-f/weeks-start-on-monday/releases) and
unzip [the
file](https://github.com/F-i-f/weeks-start-on-monday/releases/download/v8/weeks-start-on-monday@extensions.gnome-shell.fifi.org.v8.shell-extension.zip)
in the
`~/.local/share/gnome-shell/extensions/weeks-start-on-monday@extensions.gnome-shell.fifi.org`
directory (you may have to create the directory).

## Building from source

### Requirements

- [meson](http://mesonbuild.com/) v0.44.0 or later.

### Running the build

- Check out: `git clone https://github.com/F-i-f/weeks-start-on-monday/`

- `cd weeks-start-on-monday`

- Run meson: `meson build`

- To install in your your gnome shell extensions' directory (~/.local/share/gnome-shell/extensions), run ninja: `ninja -C build install`

- To build the extension zip files, run: `ninja -C build extension.zip`, the extension will be found under `build/extension.zip`.

## Changelog

### Version 8
#### March 25, 2021

- Gnome-shell 40.0 compatibility.
- Update preferences for Gnome-shell 40.0.
- Update meson-gse to latest:
  - Now prints the GJS version in the system log at start-up (if debug
	is enabled).
  - Support more mozjs version (78, 68, 52) for build-time syntax
	checks (`ninja test`).

### Version 7
#### October 6, 2020

- Declare gnome-shell 3.38 compatibility (no code changes required).

### Version 6
#### March 11, 2020

- Declare gnome-shell 3.36 compatibility (no code changes required).
- Fix deprecation warning in preferences.
- Update meson-gse to latest.
- Now prints the gnome-shell version and the session type on start-up.

### Version 5
#### October 16, 2019

- Add German translation.

### Version 4
#### September 29, 2019

- Declared gnome-shell 3.34 compatibility (no code changes required).

### Version 3
#### September 6, 2019

- Declared gnome-shell 3.28 and 3.33.90 compatibility (no code changes required).
- Updated meson-gse to latest.
- Fixed a warning about js const misuse (in meson-gse provided code).
- Added Travis CI to GitHub repository.
- Minor documentation updates (License section, Travis CI badge).

### Version 2
#### March 26, 2019

- ES6 / Gnome-Shell 3.32 compatibility (still compatible with 3.30 and lower).
- Updated meson-gse to latest.
- Minor doc updates.

### Version 1
#### March 25, 2019

First public release.

## Credits

- The [`meson-gse` credits](https://github.com/F-i-f/meson-gse/) are
  included here by reference.
- [luciangabor](https://extensions.gnome.org/accounts/profile/luciangabor)
  for the original extension.
- German translation by [Etamuk](https://github.com/Etamuk).

<!--  LocalWords:  extensions' Changelog luciangabor ES6 gse js const
 -->
<!--  LocalWords:  merchantability Etamuk
 -->
