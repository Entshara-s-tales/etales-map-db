export type MapData = Record<string | number, string | number | undefined>;

export class Line {
  line: string;
  matcher: string;
  data: MapData = {};

  constructor(line: string, matcher: string) {
    this.line = line;
    this.matcher = matcher;
  }

  setData(data: MapData) {
    this.data = data;
  }

  toJSON() {
    return this.data;
  }
}
