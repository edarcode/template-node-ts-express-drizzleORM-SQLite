export class RouteErr extends Error {
  msg: string;
  status: number;
  constructor() {
    super();
    this.name = "RouteErr";
    this.msg = "Ruta no encontrada.";
    this.status = 404;
  }
}
