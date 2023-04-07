export interface ILoginHomeRequestData{
  id: number;
  color: string;
  text: string;
  buttonType:  "" | "default" | "text" | "success" | "warning" | "info" | "primary" | "danger";
  buttonText: "" | "default" | "text" | "success" | "warning" | "info" | "primary" | "danger";
}

export interface HomeDataResponseData {
  items: ILoginHomeRequestData[];
}
