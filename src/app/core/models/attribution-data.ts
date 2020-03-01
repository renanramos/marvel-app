export class AttributionData {

  attributionHTML: string;
  attributionText: string;
  copyright: string;

  constructor(attributionText?: string, attributionHTML?: string, copyright?: string) {
    this.attributionText = attributionText;
    this.attributionHTML = attributionHTML;
    this.copyright = copyright;
  }

}