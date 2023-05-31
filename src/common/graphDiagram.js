const parseLine = (line) => {
    let stack = [];
    let currentWord = '';
    let currentObject = {};

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === ' ') {
            continue;
        }

        if (char === '(') {
            if (currentWord.length > 0) {
                currentObject[currentWord] = [];
                stack.push(currentObject);
                currentObject = {};
                currentWord = '';
            }
        } else if (char === ',') {
            if (currentWord.length > 0) {
                stack[stack.length - 1][Object.keys(stack[stack.length - 1])[0]].push(currentWord);
                currentWord = '';
            }
        } else if (char === ')') {
            if (currentWord.length > 0) {
                stack[stack.length - 1][Object.keys(stack[stack.length - 1])[0]].push(currentWord);
                currentWord = '';
            }
            if (stack.length > 1) {
                const popped = stack.pop();
                stack[stack.length - 1][Object.keys(stack[stack.length - 1])[0]].push(popped);
            }
        } else {
            currentWord += char;
        }
    }

    if (currentWord.length > 0) {
        return [currentWord];
    }

    if (stack.length === 1) {
        return [stack.pop()];
    }

    return [currentObject];
}

export const parseLayout = (layout) => {
    const lines = layout.split('\n');

    const contentLines = lines.filter(line => line.includes('|'));

    return contentLines.map(line => {
        const sections = line.split('|').slice(1, -1);
        return sections.map(section => parseLine(section.trim()));
    });
}

/*
const layout = `
---------------------------------
| HEADER (LOGO, NAV, SEARCH, PROFILE) |
---------------------------------
|        MAIN_DASHBOARD                |
|                                      |
|                                      |
---------------------------------
| DETAILS_1 | DETAILS_2 | STATS        |
|           |           |              |
|           |           |              |
---------------------------------
|            FOOTER                    |
---------------------------------
`;

console.log(parseLayout(layout));
*/

// reverse method of parseLayout
export const generateLayout = (structure) => {
    let maxWidth = 0;

    // calculate maximum width
    structure.forEach(line => {
        let lineLength = 0;
        line.forEach((section, sectionIndex) => {
            if (typeof section === 'string') {
                lineLength += section.length;
            } else {
                const key = Object.keys(section)[0];
                const values = section[key];

                lineLength += key.length + 2; // plus 2 for parentheses

                values.forEach((value, valueIndex) => {
                    lineLength += value.length;
                    if (valueIndex < values.length - 1) {
                        lineLength += 2; // for ', '
                    }
                });
            }

            if (sectionIndex < line.length - 1) {
                lineLength += 3; // for ' | '
            }
        });
        
        lineLength += 4; // for '| ' at the start and ' |' at the end of the line
        maxWidth = Math.max(maxWidth, lineLength);
    });

    let layout = '';
    let border = '-'.repeat(maxWidth) + '\n';

    structure.forEach(line => {
        layout += border;
        layout += '| ';

        line.forEach((section, sectionIndex) => {
            if (typeof section === 'string') {
                layout += section;
            } else {
                const key = Object.keys(section)[0];
                const values = section[key];

                layout += key + ' (';

                values.forEach((value, valueIndex) => {
                    layout += value;
                    if (valueIndex < values.length - 1) {
                        layout += ', ';
                    }
                });

                layout += ')';
            }

            if (sectionIndex < line.length - 1) {
                layout += ' | ';
            }
        });

        // add spaces to the end of the line until it reaches maxWidth
        while (layout.length % maxWidth !== maxWidth - 1) {
            layout += ' ';
        }

        layout += ' |\n';
    });

    layout += border;

    return layout;
}
