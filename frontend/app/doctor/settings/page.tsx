"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Lock, User } from "lucide-react"

export default function DoctorSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                    <p className="text-sm text-gray-500">Manage your account settings and preferences.</p>
                </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="bg-white border text-gray-500">
                    <TabsTrigger value="profile" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-2">
                        <User className="w-4 h-4" /> Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-2">
                        <Lock className="w-4 h-4" /> Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-2">
                        <Bell className="w-4 h-4" /> Notifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input defaultValue="Doctor" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input defaultValue="Smith" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Specialization</Label>
                                <Input defaultValue="Cardiologist" />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input defaultValue="doctor@clinic.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input defaultValue="+1234567890" />
                            </div>
                            <div className="flex justify-end">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Current Password</Label>
                                <Input type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label>New Password</Label>
                                <Input type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label>Confirm Password</Label>
                                <Input type="password" />
                            </div>
                            <div className="flex justify-end">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Update Password</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Configure how you receive notifications.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-gray-500 text-center py-10">
                                Notification settings coming soon...
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
