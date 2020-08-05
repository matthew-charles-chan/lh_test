### CLI options

```
$ lighthouse --help

lighthouse <url>

Logging:
  --verbose  Displays verbose logging                                                                                                      [boolean]
  --quiet    Displays no progress, debug logs or errors                                                                                    [boolean]

Configuration:
  --save-assets                  Save the trace & devtools log to disk                                                                     [boolean]
  --list-all-audits              Prints a list of all available audits and exits                                                           [boolean]
  --list-trace-categories        Prints a list of all required trace categories and exits                                                  [boolean]
  --print-config                 Print the normalized config for the given config and options, then exit.                                  [boolean]
  --additional-trace-categories  Additional categories to capture with the trace (comma-delimited).
  --config-path                  The path to the config JSON.
                                 An example config file: lighthouse-core/config/lr-desktop-config.js
  --budget-path                  The path to the budget.json file for LightWallet.
  --chrome-flags                 Custom flags to pass to Chrome (space-delimited). For a full list of flags, see
                                 http://peter.sh/experiments/chromium-command-line-switches/.

                                 Environment variables:
                                 CHROME_PATH: Explicit path of intended Chrome binary. If set must point to an executable of a build of
                                 Chromium version 66.0 or later. By default, any detected Chrome Canary or Chrome (stable) will be launched.
                                                                                                                                       [default: ""]
  --port                         The port to use for the debugging protocol. Use 0 for a random port                                    [default: 0]
  --preset                       Use a built-in configuration.                                            [choices: "experimental", "perf"]
                                 WARNING: If the --config-path flag is provided, this preset will be ignored.
  --hostname                     The hostname to use for the debugging protocol.                                              [default: "localhost"]
  --max-wait-for-load            The timeout (in milliseconds) to wait before the page is considered done loading and the run should continue.
                                 WARNING: Very high values can lead to large traces and instability                                 [default: 45000]
  --emulated-form-factor         Controls the emulated device form factor (mobile vs. desktop) if not disabled                      [choices: "mobile", "desktop", "none"] [default: "mobile"]
  --enable-error-reporting       Enables error reporting, overriding any saved preference. --no-enable-error-reporting will do the opposite. More:
                                 https://git.io/vFFTO
  --gather-mode, -G              Collect artifacts from a connected browser and save to disk. If audit-mode is not also enabled, the run will quit
                                 early.                                                                                                    [boolean]
  --audit-mode, -A               Process saved artifacts from disk                                                                         [boolean]

Output:
  --output       Reporter for the results, supports multiple values                        [choices: "json", "html", "csv"] [default: "html"]
  --output-path  The file path to output the results. Use 'stdout' to write to stdout.
                 If using JSON output, default is stdout.
                 If using HTML or CSV output, default is a file in the working directory with a name based on the test URL and date.
                 If using multiple outputs, --output-path is appended with the standard extension for each output type. "reports/my-run" -> "reports/my-run.report.html", "reports/my-run.report.json", etc.
                 Example: --output-path=./lighthouse-results.html
  --view         Open HTML report in your browser                                                                                          [boolean]

Options:
  --help                        Show help                                                                                                  [boolean]
  --version                     Show version number                                                                                        [boolean]
  --cli-flags-path              The path to a JSON file that contains the desired CLI flags to apply.
                                Flags specified at the command line will still override the file-based ones.
  --blocked-url-patterns        Block any network requests to the specified URL patterns                                                     [array]
  --disable-storage-reset       Disable clearing the browser cache and other storage APIs before a run                                     [boolean]
  --throttling-method                  Controls throttling method         [choices: "devtools", "provided", "simulate"]
  --throttling.rttMs                   Controls simulated network RTT (TCP layer)
  --throttling.throughputKbps          Controls simulated network download throughput
  --throttling.requestLatencyMs        Controls emulated network RTT (HTTP layer)
  --throttling.downloadThroughputKbps  Controls emulated network download throughput
  --throttling.uploadThroughputKbps    Controls emulated network upload throughput
  --throttling.cpuSlowdownMultiplier   Controls simulated + emulated CPU throttling
  --extra-headers               Set extra HTTP Headers to pass with request                                                                 [string]

Examples:
  lighthouse <url> --view                                                   Opens the HTML report in a browser after the run completes
  lighthouse <url> --config-path=./myconfig.js                              Runs Lighthouse with your own configuration: custom audits, report
                                                                            generation, etc.
  lighthouse <url> --output=json --output-path=./report.json --save-assets  Save trace, devtoolslog, and named JSON report.
  lighthouse <url> --emulated-form-factor=none                              Disable device emulation and all throttling.
    --throttling-method=provided
  lighthouse <url> --chrome-flags="--window-size=412,660"                   Launch Chrome with a specific window size
  lighthouse <url> --quiet --chrome-flags="--headless"                      Launch Headless Chrome, turn off logging
  lighthouse <url> --extra-headers "{\"Cookie\":\"monster=blue\"}"          Stringify\'d JSON HTTP Header key/value pairs to send in requests
  lighthouse <url> --extra-headers=./path/to/file.json                      Path to JSON file of HTTP Header key/value pairs to send in requests
  lighthouse <url> --only-categories=performance,pwa                        Only run the specified categories. Available categories: accessibility,
                                                                            best-practices, performance, pwa, seo.

For more information on Lighthouse, see https://developers.google.com/web/tools/lighthouse/.
```

##### Output Examples

```sh
lighthouse
# saves `./<HOST>_<DATE>.report.html`

lighthouse --output json
# json output sent to stdout

lighthouse --output html --output-path ./report.html
# saves `./report.html`

# NOTE: specifying an output path with multiple formats ignores your specified extension for *ALL* formats
lighthouse --output json --output html --output-path ./myfile.json
# saves `./myfile.report.json` and `./myfile.report.html`

lighthouse --output json --output html
# saves `./<HOST>_<DATE>.report.json` and `./<HOST>_<DATE>.report.html`

lighthouse --output-path=~/mydir/foo.out --save-assets
# saves `~/mydir/foo.report.html`
# saves `~/mydir/foo-0.trace.json` and `~/mydir/foo-0.devtoolslog.json`

lighthouse --output-path=./report.json --output json
# saves `./report.json`
```

##### Lifecycle Examples
You can run a subset of Lighthouse's lifecycle if desired via the `--gather-mode` (`-G`) and  `--audit-mode` (`-A`) CLI flags.

```sh
lighthouse http://example.com -G
# launches browser, collects artifacts, saves them to disk (in `./latest-run/`) and quits

lighthouse http://example.com -A
# skips browser interaction, loads artifacts from disk (in `./latest-run/`), runs audits on them, generates report

lighthouse http://example.com -GA
# Normal gather + audit run, but also saves collected artifacts to disk for subsequent -A runs.


# You can optionally provide a custom folder destination to -G/-A/-GA. Without a value, the default will be `$PWD/latest-run`.
lighthouse -GA=./gmailartifacts https://gmail.com
```


#### Notes on Error Reporting

The first time you run the CLI you will be prompted with a message asking you if Lighthouse can anonymously report runtime exceptions. The Lighthouse team uses this information to detect new bugs and avoid regressions. Opting out will not affect your ability to use Lighthouse in any way. [Learn more](https://github.com/GoogleChrome/lighthouse/blob/master/docs/error-reporting.md).

## Using the Node module
You can also use Lighthouse programmatically with the Node module.

Read [Using Lighthouse programmatically](./docs/readme.md#using-programmatically) for help getting started.\
Read [Lighthouse Configuration](./docs/configuration.md) to learn more about the configuration options available.

## Viewing a report

Lighthouse can produce a report as JSON or HTML.

HTML report:

<img src="https://raw.githubusercontent.com/GoogleChrome/lighthouse/443ff2c8a297dfd2297dfaca86c4966a87c8574a/assets/example_audit.png" alt="Lighthouse example audit" width="500px">

### Online Viewer

Running Lighthouse with the `--output=json` flag generates a JSON dump of the run.
You can view this report online by visiting <https://googlechrome.github.io/lighthouse/viewer/>
and dragging the file onto the app. You can also use the "Export" button from the
top of any Lighthouse HTML report and open the report in the
[Lighthouse Viewer](https://googlechrome.github.io/lighthouse/viewer/).

In the Viewer, reports can be shared by clicking the share icon in the top
right corner and signing in to GitHub.

> **Note**: shared reports are stashed as a secret Gist in GitHub, under your account.

## Docs & Recipes

Useful documentation, examples, and recipes to get you started.
