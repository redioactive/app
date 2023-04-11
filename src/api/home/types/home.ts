
/** HomeList */
export interface ILoginHomeRequestData{
      id: number;
      color: string;
      text: string;
      buttonType: "" | "default" | "text" | "success" | "warning" | "info" | "primary" | "danger",
      buttonText: string,
}
export interface HomeDataResponseData {
  HomeList: ILoginHomeRequestData[];
}

/** HomeInfo */
export interface IHomeInfoRequestData {
  id:number,
  icon:string,
  texts: string[]
}
export interface HomeInfoResponseData {
  code: number;
  items: IHomeInfoRequestData[];
}