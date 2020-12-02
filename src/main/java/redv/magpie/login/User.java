package redv.magpie.login;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Getter
@NoArgsConstructor
@Table(name = "data_user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String userName;

  public User(String userName) {
    this.userName = userName.toLowerCase();
  }
}
