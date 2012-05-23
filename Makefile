example:
	./bin/cmd.js knit ./example/beep/widget \
		-o ./example/beep/widget/yarn.js
	browserify ./example/beep/entry.js -o ./example/beep/bundle.js

run:
	firefox ./example/beep/index.html

.PHONY: example run