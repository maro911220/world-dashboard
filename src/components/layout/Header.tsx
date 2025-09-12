import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggleButton from "@/components/layout/ThemeToggleButton";

export default function Header() {
  return (
    <header className="header">
      <h1 className="header-title">
        <p>세계 대시보드</p>
        <span className="header-subtitle">
          국가별 간단한 정보 및 날씨를 확인해보세요
        </span>
      </h1>
      <div className="header-btn">
        <Button asChild variant="outline" size="icon">
          <a href="https://github.com/maro911220" target="_blank">
            <GithubIcon />
          </a>
        </Button>
        <ThemeToggleButton />
      </div>
    </header>
  );
}
