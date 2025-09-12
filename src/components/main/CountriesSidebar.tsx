"use client";
import { Globe } from "lucide-react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { CountriesSidebarProps } from "@/lib/types";
import CountryList from "./sidebar/CountryList";
import CountrySearch from "./sidebar/CountrySearch";

/* 사이드바 */
export default function CountriesSidebar({
  countries,
  selectedCountry,
  onSelectCountry,
}: CountriesSidebarProps) {
  return (
    <aside className="sidebar-container">
      <h2 className="hidden">국가 목록</h2>
      <Card className="content-card h-full pb-2 gap-0">
        <CardHeader className="sidebar-header">
          <CardTitle className="sidebar-title">
            <Globe className="sidebar-title-icon" />
            국가 목록
          </CardTitle>
          <CardDescription className="sidebar-description">
            다양한 국가를 검색해보세요.
          </CardDescription>
        </CardHeader>
        <CountrySearch
          selectedCountry={selectedCountry}
          onSelectCountry={onSelectCountry}
        />
        <CardContent className="p-0 h-full overflow-hidden">
          <CountryList
            countries={countries}
            selectedCountry={selectedCountry}
            onSelectCountry={onSelectCountry}
          />
        </CardContent>
      </Card>
    </aside>
  );
}
