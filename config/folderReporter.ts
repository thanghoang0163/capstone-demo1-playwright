import type {
  Reporter,
  TestCase,
  TestResult,
  FullConfig,
} from "@playwright/test/reporter";

import fs from "fs";
import path from "path";

// ===== CREATE RESULT FOLDER WHEN FAILING TEST =====
class FolderReporter implements Reporter {
  private testDir = "";

  onBegin(config: FullConfig) {
    // Get The Actual TestDir From Playwright Config
    this.testDir = config.projects[0]?.testDir ?? config.rootDir;
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status !== "failed") {
      return;
    }

    // Get File Test Path
    const filePath = test.location.file;

    const fileName = path.basename(filePath, ".spec.ts");
    const fileDir = path.dirname(filePath);

    // Get Relative Folder Path From The Testing Directory
    const relativeDir = path.relative(this.testDir, fileDir);

    // Split Into Each Nested Folder Segment
    const folderSegments = relativeDir
      .split(path.sep)
      .filter(Boolean)
      .map((segment) => this.sanitize(segment));

    const outputDir = path.join(
      "test-results",
      ...folderSegments,
      this.sanitize(fileName),
    );

    fs.mkdirSync(outputDir, { recursive: true });

    for (const attachment of result.attachments) {
      if (!attachment.path) {
        continue;
      }

      const attachmentFileName = path.basename(attachment.path);

      fs.copyFileSync(
        attachment.path,
        path.join(outputDir, attachmentFileName),
      );
    }
  }

  private sanitize(name: string): string {
    return name.replace(/[<>:"/\\|?*]/g, "_");
  }
}

export default FolderReporter;
