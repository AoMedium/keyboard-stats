/**
 * Represents one dataset for Line charts.
 */
export default class LineFigure {
  fields;
  entryData;
  dataOffset; 

  constructor(label, entryData, borderColor, backgroundColor, dataOffset) {
    this.entryData = entryData;
    this.dataOffset = dataOffset || 0;

    let data = entryData ? entryData.map((entry, index) => {
      return entry.value
    }): [];

    data.splice(0, dataOffset);

    borderColor = borderColor || 'rgb(255, 99, 132)';
    backgroundColor = backgroundColor || 'rgba(255, 99, 132, 0.5)';

    this.fields = {
      label,
      data,
      borderColor,
      backgroundColor
    }
  }
}