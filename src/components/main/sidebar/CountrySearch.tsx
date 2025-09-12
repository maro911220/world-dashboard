"use client";
import { useState, useCallback, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CountrySearchProps } from "@/lib/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useCountrySearch } from "@/lib/hooks/useCountrySearch";

/* 국가 선택 드롭다운 컴포넌트 */
export default function CountrySearch({
  selectedCountry,
  onSelectCountry,
}: CountrySearchProps) {
  const [open, setOpen] = useState(false);
  const { searchTerm, setSearchTerm, suggestions, loading, error } =
    useCountrySearch();

  // 드롭다운 토글
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
      if (!newOpen) {
        setSearchTerm("");
      }
    },
    [setSearchTerm]
  );

  // 국가 선택 핸들러
  const handleCountrySelect = useCallback(
    (country: any) => {
      onSelectCountry(country);
      setOpen(false);
      setSearchTerm("");
    },
    [onSelectCountry, setSearchTerm]
  );

  // PopoverTrigger 텍스트
  const popoverTriggerText = useMemo(() => {
    return selectedCountry?.name.common;
  }, [selectedCountry]);

  // CommandEmpty 텍스트
  const emptyMessage = useMemo(() => {
    if (loading) return "검색 중...";
    if (error) return error;
    if (searchTerm) return "국가를 찾을 수 없습니다.";
    return "검색어를 입력하여 국가를 찾으세요.";
  }, [loading, error, searchTerm]);

  // 국가 선택 상황 체크
  const isCountrySelected = useCallback(
    (countryName: string) => {
      return selectedCountry?.name.common === countryName;
    },
    [selectedCountry]
  );

  return (
    <div className="popover-container">
      <Popover open={open} onOpenChange={handleOpenChange}>
        {/* 검색 트리거 버튼 */}
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            variant="outline"
            aria-expanded={open}
            aria-label="국가 선택"
            className="popover-trigger-button"
          >
            <span className="truncate">{popoverTriggerText}</span>
            <ChevronsUpDown
              aria-hidden="true"
              className="ml-2 h-4 w-4 shrink-0 opacity-50"
            />
          </Button>
        </PopoverTrigger>
        {/* 검색 드롭다운 컨텐츠 */}
        <PopoverContent
          className="popover-content"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <Command>
            {/* 검색창 */}
            <CommandInput
              autoFocus
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="command-input"
              placeholder="국가를 검색하세요..."
            />
            {/* 목록 */}
            <CommandList>
              {/* 검색 결과가 없을 때 */}
              <CommandEmpty>
                <div className="command-empty" role="status">
                  {emptyMessage}
                </div>
              </CommandEmpty>
              {/* 국가 목록 그룹 */}
              <CommandGroup>
                {!loading &&
                  suggestions.map((country) => {
                    const isSelected = isCountrySelected(country.name.common);

                    return (
                      <CommandItem
                        key={country.name.official}
                        value={country.name.common}
                        onSelect={() => handleCountrySelect(country)}
                        className="command-item"
                      >
                        <Check
                          className={cn(
                            "command-item-check-icon",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className="flex-none mr-2"
                          aria-label={`${country.name.common} 국기`}
                        >
                          {country.flag}
                        </span>
                        <span className="truncate">{country.name.common}</span>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
