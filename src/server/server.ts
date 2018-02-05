import config from "../config";
import { Chat } from "./chat";
const app = new Chat();
app.listen(config.port);

export default app;
