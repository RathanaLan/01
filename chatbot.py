import customtkinter as ctk
import requests
from tkinter import filedialog

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "codellama"

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")

class CopilotChat(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Copilot Chat (Ollama)")
        self.geometry("800x600")

        # Scrollable chat frame
        self.chat_frame = ctk.CTkScrollableFrame(self, width=760, height=480)
        self.chat_frame.pack(padx=20, pady=(20,10), fill="both", expand=True)

        # Input bar
        input_frame = ctk.CTkFrame(self)
        input_frame.pack(fill="x", padx=20, pady=10)

        self.entry = ctk.CTkEntry(input_frame, placeholder_text="Ask me anything...", width=500)
        self.entry.pack(side="left", padx=10, pady=10)

        send_button = ctk.CTkButton(input_frame, text="Send", command=self.send_message)
        send_button.pack(side="left", padx=10)

        attach_button = ctk.CTkButton(input_frame, text="Attach File", command=self.attach_file)
        attach_button.pack(side="left", padx=10)

        self.attached_text = None

    def attach_file(self):
        file_path = filedialog.askopenfilename(
            title="Select a file",
            filetypes=[("Text files", "*.txt"), ("All files", "*.*")]
        )
        if file_path:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                self.attached_text = f.read()
            self._append_message("System", f"Attached file: {file_path}", align="w", color="yellow")

    def send_message(self):
        user_text = self.entry.get()
        if not user_text.strip():
            return

        self.entry.delete(0, "end")
        self._append_message("You", user_text, align="w", color="green")

        # Combine user text with attached file content if present
        prompt = user_text
        if self.attached_text:
            prompt += f"\n\n[Attached file content]\n{self.attached_text}"

        try:
            response = requests.post(
                OLLAMA_URL,
                json={"model": MODEL, "prompt": prompt, "stream": False}
            )
            data = response.json()
            reply = data.get("response", "")
            self._append_message("Copilot", reply, align="e", color="cyan")
        except Exception as e:
            self._append_message("Error", str(e), align="e", color="red")

    def _append_message(self, sender, text, align="w", color="white"):
        msg = ctk.CTkLabel(
            self.chat_frame,
            text=f"{sender}: {text}",
            anchor="w" if align == "w" else "e",
            justify="left" if align == "w" else "right",
            text_color=color,
            wraplength=700
        )
        msg.pack(anchor=align, pady=5, padx=10)

if __name__ == "__main__":
    app = CopilotChat()
    app.mainloop()
