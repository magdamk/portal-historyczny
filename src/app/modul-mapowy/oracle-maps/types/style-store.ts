export interface StyleStoreOptions {
  url: string;
  callback: (a: any) => void
}

export interface StyleStore {

  getServerSideStyle(dataSource: string, styleName: string, options: StyleStoreOptions): void

}
