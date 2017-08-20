![AURA](https://hostr.co/file/970/YSADRZhRvW4A/aura-logo.png)

![Owned By Acculevel](https://img.shields.io/badge/Owned%20By-Acculevel-red.svg) ![Powered By Marsh Multimedia](https://img.shields.io/badge/Powered%20By-Marsh%20Multimedia-blue.svg)

> A U R A is an extremely simple error reporting service as connect middleware.

  - So stupid simple that it only has a few methods
  - Provides an overly opinionated wrapper for logging errors with Loggly
  - Shows pretty crashes in the console via Chalk

### Example Express App
```
const express = require('express');
const app = express();
const aura = require('aura');

aura.attach({
    token: 'YOUR_LOGGLY_TOKEN',
    subdomain: 'YOUR_SUBDOMAIN'
});

// Routes and stuff goes here
app.get('/bad', (req, res) => {
    foo((err, bar) => {
        if (err) {
            aura.error(err); // You can also use aura.info(msg) for good stuff
        }

        // ...
    });
});

app.use(aura.errorHandler());

app.listen(...);
```

### A U R A
```
 By: Dylan Marsh <dylan@acculevel.com>
 Acculevel Inc - http://acculevel.com
 Marsh Multimedia DBA Knoware - http://knoware.co
 (C) 2017 Acculevel Inc. - All Rights Reserved
```