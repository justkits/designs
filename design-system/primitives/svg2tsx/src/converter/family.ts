import { ConfigManager } from "@/config/manager";
import { type FileToWrite } from "@/files/base";
import { FacadeComponentFile } from "@/files/facade";
import { IconFile, type IconMetadata } from "@/files/icon";
import { IconMapFile } from "@/files/iconMap";
import { IndexFile } from "@/files/indexFile";
import { kebabToPascal } from "@/lib/format";

export class Family {
  public readonly name: string;
  private readonly iconFiles: IconFile[] = [];

  private readonly shouldWriteFacade: boolean;
  private readonly facadeComponentName: string = "";
  private readonly iconMapFile: IconMapFile | null = null;
  private readonly facadeFile: FacadeComponentFile | null = null;

  private readonly shouldWriteBarrel: boolean;
  private readonly indexFile: IndexFile;

  constructor(name: string) {
    // flat 구조에서는 family 이름이 빈 문자열로 들어온다.
    this.name = name;

    this.shouldWriteFacade = ConfigManager.config.mode !== "barrel"; // facade이거나 both면 facade 파일을 쓴다.
    this.shouldWriteBarrel = ConfigManager.config.mode !== "facade"; // barrel이거나 both면 barrel 파일을 쓴다.

    // index 파일은 항상 생성
    this.indexFile = new IndexFile(name);

    // facade 파일과 iconMap 파일은 facade 모드이거나 both 모드일 때 생성
    if (this.shouldWriteFacade) {
      this.facadeComponentName =
        name === ""
          ? ConfigManager.config.facadeName
          : kebabToPascal(name) + ConfigManager.config.facadeSuffix;
      this.iconMapFile = new IconMapFile(name);
      this.facadeFile = new FacadeComponentFile(
        this.name,
        this.facadeComponentName,
      );
    }
  }

  public addIcon(icon: IconMetadata) {
    this.iconFiles.push(new IconFile(icon, this.name));

    // 아이콘이 추가될 때마다 iconMap과 index 파일에 엔트리를 추가한다.
    if (this.shouldWriteFacade && this.iconMapFile) {
      this.iconMapFile.addIconEntry(icon);
    }
    if (this.shouldWriteBarrel) {
      this.indexFile.addIconExport(icon);
    }
  }

  public async prepare() {
    // 1. 모든 아이콘 파일 준비 (SVGR 변환)
    await Promise.all(this.iconFiles.map((iconFile) => iconFile.prepare()));

    // 2. index 파일 준비
    if (this.shouldWriteFacade) {
      this.indexFile.addFacadeExport(this.facadeComponentName);
    }
    this.indexFile.prepare();

    // 3. facade 파일 (iconMap + component) 준비
    if (this.shouldWriteFacade && this.iconMapFile && this.facadeFile) {
      this.iconMapFile.prepare();
      this.facadeFile.prepare();
    }
  }

  public async save() {
    const files: FileToWrite[] = [...this.iconFiles, this.indexFile];

    if (this.shouldWriteFacade && this.iconMapFile && this.facadeFile) {
      files.push(this.iconMapFile, this.facadeFile);
    }

    await Promise.all(files.map((file) => file.save()));
  }

  public getSummary() {
    return {
      familyName: this.name,
      iconCount: this.iconFiles.length,
    };
  }
}
