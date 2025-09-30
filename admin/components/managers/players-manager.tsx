"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDropzone } from "react-dropzone";

type Game = { id: string; name: string; slug?: string };
type PlayerForm = {
  id: string; name: string; nickname: string; role: string; gender: string; avatar?: string | null; rank?: string 
};

export function TeamsWithPlayersManager() {
  const { toast } = useToast();
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    rank: "",
    gameId: "",
    players: [{ name: "", nickname: "", role: "", gender: "Male", avatar: "" }] as PlayerForm[],
  });

  useEffect(() => {
    fetchGames();
    fetchTeams();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch("http://localhost:9000/games");
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:9000/teams");
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerChange = (index: number, field: keyof PlayerForm, value: any) => {
    const players = [...form.players];
    players[index] = { ...players[index], [field]: value };
    setForm({ ...form, players });
  };
  
  const handleAvatarUpload = async (index: number, file: File) => {
  const token = localStorage.getItem("token");
  const formDataObj = new FormData();
  formDataObj.append("file", file);

  const playerId = form.players[index]?.id || "temp"; 

  const res = await fetch(`http://localhost:9000/players/upload-avatar/${playerId}`, {
    method: "POST",
    body: formDataObj,
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.ok) {
    const data = await res.json();
    handlePlayerChange(index, "avatar", data.avatar);
    toast({ title: "Avatar uploaded", description: "Player avatar updated successfully" });
  } else {
    toast({ title: "Error", description: "Failed to upload avatar", variant: "destructive" });
  }
};

  const addPlayer = () => {
    setForm({
      ...form,
      players: [...form.players, {
        name: "", nickname: "", role: "", gender: "Male", avatar: "",
        id: ""
      }],
    });
  };

  const removePlayer = (index: number) => {
    const players = [...form.players];
    players.splice(index, 1);
    setForm({ ...form, players });
  };

  // dropzone component inlined for brevity
  function AvatarDrop({ index }: { index: number }) {
    const onDrop = (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        handlePlayerChange(index, "avatar", reader.result as string);
      };
      reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { "image/*": [] },
      multiple: false,
    });

    const current = form.players[index]?.avatar;

    return (
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-dashed border-2 p-2 rounded cursor-pointer ${
          isDragActive ? "bg-gray-100" : ""
        }`}
      >
        <input {...getInputProps()} />
        {current ? (
          <img src={current} className="w-20 h-20 object-cover rounded" alt="avatar" />
        ) : (
          <div className="text-xs text-muted-foreground">Drag & drop photo or click</div>
        )}
      </div>
    );
  }

  const resetForm = () => {
    setEditingTeamId(null);
    setForm({
      name: "",
      rank: "",
      gameId: "",
      players: [{
        name: "", nickname: "", role: "", gender: "Male", avatar: "",
        id: ""
      }],
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const token = localStorage.getItem("token");

    if (!form.gameId) {
      toast({ title: "Validation", description: "Please select a game", variant: "destructive" });
      return;
    }
    if (!form.name) {
      toast({ title: "Validation", description: "Please enter team name", variant: "destructive" });
      return;
    }

    const payload = {
      name: form.name,
      rank: form.rank,
      game: { id: form.gameId },
      players: form.players.map((p) => ({
        name: p.name,
        nickname: p.nickname,
        role: p.role,
        gender: p.gender,
        avatar: p.avatar || null,
        rank: p.rank || null,
      })),
    };

    try {
      const url = editingTeamId ? `http://localhost:9000/teams/${editingTeamId}` : "http://localhost:9000/teams";
      const method = editingTeamId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      toast({ title: "Success", description: editingTeamId ? "Team updated" : "Team created" });
      resetForm();
      fetchTeams();
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to save team", variant: "destructive" });
    }
  };

  const handleEdit = (team: any) => {
    setEditingTeamId(team.id);
    setForm({
      name: team.name || "",
      rank: team.rank || "",
      gameId: team.game?.id || "",
      players:
        team.players?.map((p: any) => ({
          name: p.name || "",
          nickname: p.nickname || "",
          role: p.role || "",
          gender: p.gender || "Male",
          avatar: p.avatar || "",
          rank: p.rank || "",
        })) || [{ name: "", nickname: "", role: "", gender: "Male", avatar: "" }],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (teamId: string) => {
    if (!confirm("Delete team? This will soft-delete the team.")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:9000/teams/${teamId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      toast({ title: "Deleted", description: "Team removed" });
      fetchTeams();
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingTeamId ? "Edit Team & Players" : "Create Team with Players"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Team Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label>Rank</Label>
                <Input value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} />
              </div>
              <div>
                <Label>Game</Label>
                <Select value={form.gameId} onValueChange={(val) => setForm({ ...form, gameId: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select game" />
                  </SelectTrigger>
                  <SelectContent>
                    {games.map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Players</Label>
              <div className="space-y-3 mt-2">
                {form.players.map((player, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center border p-3 rounded">
                    <div className="md:col-span-2 space-y-1">
                      <Input placeholder="Full Name" value={player.name} onChange={(e) => handlePlayerChange(idx, "name", e.target.value)} />
                      <Input placeholder="Nickname" value={player.nickname} onChange={(e) => handlePlayerChange(idx, "nickname", e.target.value)} />
                    </div>
                    <div>
                      <Input placeholder="Role" value={player.role} onChange={(e) => handlePlayerChange(idx, "role", e.target.value)} />
                    </div>
                    <div>
                      <Select value={player.gender} onValueChange={(val) => handlePlayerChange(idx, "gender", val)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <AvatarDrop index={idx} />
                      <div className="flex flex-col gap-2">
                        <Input placeholder="Rank" value={player.rank} onChange={(e) => handlePlayerChange(idx, "rank", e.target.value)} />
                        <div className="flex gap-2">
                          <Button type="button" variant="destructive" onClick={() => removePlayer(idx)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addPlayer}>
                  <Plus className="w-4 h-4 mr-2" /> Add Player
                </Button>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" type="button" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit">{editingTeamId ? "Update Team" : "Create Team"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <section>
        <h3 className="text-xl font-bold">Existing Teams</h3>
        {loading ? (
          <div>Loading teams...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {teams.map((team) => (
              <div key={team.id} className="border rounded shadow p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{team.name}</h4>
                    <div className="text-sm text-muted-foreground">{team.game?.name}</div>
                    <div className="text-sm">Rank: {team.rank}</div>
                    <div className="text-sm">Players: {team.players?.length || 0}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(team)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(team.id)}>
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {team.players?.map((p: any) => (
                    <div key={p.id || p.nickname + p.name} className="flex items-center gap-2 border rounded p-2">
                      <img src={p.avatar || "/placeholder.svg"} alt={p.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <div className="font-semibold">{p.nickname || p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
