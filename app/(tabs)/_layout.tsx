import { Tabs } from "expo-router";
import { BookOpen, CalendarDays, Home, PlusCircle, Search, ShoppingBasket, UserCircle } from "lucide-react-native";
import { colors } from "@/theme/tokens";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tomato,
        tabBarInactiveTintColor: colors.cocoa,
        tabBarStyle: {
          backgroundColor: colors.paper,
          borderTopColor: colors.mist,
          minHeight: 72,
          paddingBottom: 12,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <Home color={color} size={22} /> }} />
      <Tabs.Screen name="recipes" options={{ title: "Recipes", tabBarIcon: ({ color }) => <BookOpen color={color} size={22} /> }} />
      <Tabs.Screen name="add" options={{ title: "Add", tabBarIcon: ({ color }) => <PlusCircle color={color} size={26} /> }} />
      <Tabs.Screen name="search" options={{ title: "Search", tabBarIcon: ({ color }) => <Search color={color} size={22} /> }} />
      <Tabs.Screen name="grocery" options={{ title: "Groceries", tabBarIcon: ({ color }) => <ShoppingBasket color={color} size={22} /> }} />
      <Tabs.Screen name="planner" options={{ title: "Plan", tabBarIcon: ({ color }) => <CalendarDays color={color} size={22} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color }) => <UserCircle color={color} size={22} /> }} />
    </Tabs>
  );
}
