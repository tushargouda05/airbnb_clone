import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./dialog";

import { Button } from "./button";
import { Input } from "./input";

export default function EditProfileDialog({
  user,
  onSave
}) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  function submit(e) {
    e.preventDefault();

    if (onSave) {
      onSave({ name, email });
    }
  }

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button variant="outline">
          Edit profile
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Edit your profile
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={submit}
          className="space-y-4 mt-5"
        >

          <div>
            <label className="block text-sm mb-2">
              Name
            </label>

            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Email
            </label>

            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Save changes
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}