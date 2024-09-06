export interface TextConfig {
  styleName: string;
  fontFamily?: string; //Specifies the font family to be used to render the text
  fontStyle?: string; //Specifies the style (italic or normal) of the font used to render the text. It should be one of two static values: OM.Text.FONTSTYLE_ITALIC or OM.Text.FONTSTYLE_NORMAL
  fontWeight?: string; //Specifies the font weight (bold or normal) used to render the text. It should be one of two static values: OM.Text.FONTWEIGHT_BOLD or OM.Text.FONTWEIGHT_NORMAL.
  fill?: string; // Sepcifies the font color. Format is "#rrggbb"
  fontSize?: number; //Specifies the font size
  sizeUnit?: string; // Specifies the font size unit. The value can be "pixel", "meter","kilometer", "feet", "mile". Default value is "pixel"
  sticky?: boolean // If true, it will ignore polygon label box size. Default value is false.
  vAlign?: number;
  textAlign?: string;
  align?: string;
}


export interface Text {
  new(config: TextConfig): Text;

  FONTSTYLE_ITALIC: string;
  FONTSTYLE_NORMAL: string;
  FONTWEIGHT_BOLD: string;
  HORIZONTALALIGN_LEFT: string;
  HORIZONTALALIGN_RIGHT: string;
  HORIZONTALALIGN_CENTER: string;

}

