import { FC, useCallback } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  deposit: z.coerce
    .number()
    .min(18)
    .max(1000, "Максимальное значение 1000")
    .default(500)
    .transform((v) => Number(v) || 0),
  deposit_2: z.coerce
    .number()
    .min(18)
    .max(1000, "Максимальное значение 1000")
    .default(500)
    .transform((v) => Number(v) || 0),
});

type TAutoCashOut = z.infer<typeof formSchema>;

const increase_deposit_buttons = [
  {
    id: 1,
    value: 50,
  },
  {
    id: 2,
    value: 100,
  },
  {
    id: 3,
    value: 200,
  },
  {
    id: 4,
    value: 500,
  },
  {
    id: 5,
    value: 1000,
  },
];

const ButtonGameBlock: FC = () => {
  const form = useForm<TAutoCashOut>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deposit: 500,
      deposit_2: 500,
    },
  });
  const { toast } = useToast();

  const handleOnSubmit = (data: TAutoCashOut) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(data?.deposit, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  const increase_deposit = useCallback(
    (value: number) => {
      form.setValue("deposit", form.getValues().deposit + value);
    },
    [form]
  );

  const handleOnSubmitDeposit2 = (data: TAutoCashOut) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(data?.deposit_2, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <FormProvider {...form}>
      <div className="flex items-center justify-between gap-2">
        <form className="w-[49%]" onSubmit={form.handleSubmit(handleOnSubmit)}>
          <Card
            style={{
              background: `linear-gradient(90deg, rgb(36, 29, 71) 0%, rgb(43, 35, 87) 100%)`,
            }}
            className="text-white shadow-md border-2 border-violet-950"
          >
            <CardHeader className="w-full">
              <RadioGroup
                defaultValue="comfortable"
                className="flex items-center"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Автоставка</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Автовывод</Label>
                </div>
              </RadioGroup>
            </CardHeader>
            <CardContent className="w-full">
              <div className="flex gap-2">
                <div className="flex w-2/3">
                  <Button
                    type="button"
                    onClick={() =>
                      form.setValue("deposit", --form.getValues().deposit)
                    }
                    className="mx-2 p-2 w-max"
                  >
                    <Minus />
                  </Button>
                  <div
                    style={{ border: "2px solid #4934be" }}
                    className="flex rounded-sm"
                  >
                    <Input
                      type="number"
                      {...form.register("deposit")}
                      inputMode="decimal"
                      className="bg-[#231d47] w-full text-white text-base font-bold outline-none border-none"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="mx-2 hover:bg-transparent text-white hover:text-white"
                    >
                      ₽
                    </Button>
                  </div>
                  <Button
                    type="button"
                    onClick={() => increase_deposit(1)}
                    className="mx-2 p-2 w-max"
                  >
                    <Plus />
                  </Button>
                </div>
                <Button
                  type="submit"
                  style={{ fontFamily: "Rocketfont" }}
                  className="w-1/2"
                >
                  CTABKA
                </Button>
              </div>
              <div className="flex gap-2">
                {increase_deposit_buttons.map((item) => (
                  <Button
                    type="button"
                    onClick={() => form.setValue("deposit", item.value)}
                    key={item.id}
                    className="w-1/3 mt-2"
                  >
                    +{item.value}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </form>

        <form
          className="w-[49%]"
          onSubmit={form.handleSubmit(handleOnSubmitDeposit2)}
        >
          <Card
            style={{
              background: `linear-gradient(90deg, rgb(36, 29, 71) 0%, rgb(43, 35, 87) 100%)`,
            }}
            className="text-white shadow-md border-2 border-violet-950"
          >
            <CardHeader className="w-full">
              <RadioGroup
                defaultValue="comfortable"
                className="flex items-center"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Автоставка</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Автовывод</Label>
                </div>
              </RadioGroup>
            </CardHeader>
            <CardContent className="w-full">
              <div className="flex gap-2">
                <div className="flex w-2/3">
                  <Button
                    type="button"
                    onClick={() =>
                      form.setValue("deposit_2", --form.getValues().deposit)
                    }
                    className="mx-2 p-2 w-max"
                  >
                    <Minus />
                  </Button>
                  <div
                    style={{ border: "2px solid #4934be" }}
                    className="flex rounded-sm"
                  >
                    <Input
                      type="number"
                      {...form.register("deposit_2")}
                      inputMode="decimal"
                      className="bg-[#231d47] w-full text-white text-base font-bold outline-none border-none"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="mx-2 hover:bg-transparent text-white hover:text-white"
                    >
                      ₽
                    </Button>
                  </div>
                  <Button
                    type="button"
                    onClick={() =>
                      form.setValue("deposit_2", ++form.getValues().deposit)
                    }
                    className="mx-2 p-2 w-max"
                  >
                    <Plus />
                  </Button>
                </div>
                <Button
                  type="submit"
                  style={{ fontFamily: "Rocketfont" }}
                  className="w-1/2"
                >
                  CTABKA
                </Button>
              </div>
              <div className="flex gap-2">
                {increase_deposit_buttons.map((item) => (
                  <Button
                    type="button"
                    onClick={() => form.setValue("deposit_2", item.value)}
                    key={item.id}
                    className="w-1/3 mt-2"
                  >
                    +{item.value}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </FormProvider>
  );
};

export default ButtonGameBlock;
