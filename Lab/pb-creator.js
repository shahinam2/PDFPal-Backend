const fs = require('fs');

// Get the path from the command-line argument, or use a default value
const path = process.argv[2] || 'Project';

// Define the contents of the HTML, CSS, and JavaScript files
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Document</title>
</head>
<body>
    <script src="app.js"></script>
</body>
</html>
`;

const css = ``;

const js = ``;

// Check if the path exists
fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
        // Create the directory if it does not exist
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log(`Directory ${path} created successfully`);

            // Create the HTML file
            fs.writeFile(`${path}/index.html`, html, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log('HTML file created successfully');
            });

            // Create the CSS file
            fs.writeFile(`${path}/styles.css`, css, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log('CSS file created successfully');
            });

            // Create the JavaScript file
            fs.writeFile(`${path}/app.js`, js, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log('JavaScript file created successfully');
            });
        });
    } else {
        // Create the HTML file
        fs.writeFile(`${path}/index.html`, html, (err) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log('HTML file created successfully');
        });

        // Create the CSS file
        fs.writeFile(`${path}/styles.css`, css, (err) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log('CSS file created successfully');
        });

        // Create the JavaScript file
        fs.writeFile(`${path}/app.js`, js, (err) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log('JavaScript file created successfully');
        });
    }
});
