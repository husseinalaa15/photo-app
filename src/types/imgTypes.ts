export interface Image {
    id: number;
    src: {
      tiny: string;
      original: string;
    };
    title: string;
  }
  
  export interface ImagesByPage {
    [page: number]: Image[];
  }
  