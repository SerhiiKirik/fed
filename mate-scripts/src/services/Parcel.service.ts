import path from 'path';
import { DESTINATION_DIR } from '../constants.js';
import { execBashCode, makeCLIOptions } from '../tools';

export class ParcelService {
  private readonly baseOptions = {
    'out-dir': path.join(this.rootDir, DESTINATION_DIR),
  };

  private readonly source = path.join(this.rootDir, 'src/index.html');

  constructor(private readonly rootDir: string) {
  }

  serve({ showLogs = false }: { showLogs: boolean } = { showLogs: false }) {
    const options = {
      ...this.baseOptions,
      open: true,
      port: 8080,
    };

    this.run('serve', options, 'development', showLogs);
  }

  build() {
    const options = {
      ...this.baseOptions,
      'public-url':  './',
    };

    this.run('build', options, 'production');
  }

  private run(command: string, options: Record<string, any>, env = 'development', showLogs = false) {
    const optionsString = makeCLIOptions(options);
    const commandWithOptions = `cross-env NODE_ENV=${env} npx parcel ${command} ${this.source} ${optionsString}`;

    if (showLogs) {
      console.log(commandWithOptions);
    }

    execBashCode(commandWithOptions, showLogs);
  };
}
